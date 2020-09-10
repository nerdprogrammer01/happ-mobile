import React, { useRef, useState,useEffect } from "react";
import { FlatList, View, Text, StyleSheet,AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider, TouchableHighlight } from "../../components";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization";
import { SettingsBottomSheet } from "../../modals";
import NavigationNames from "../../navigations/NavigationNames";
import { useNavigation } from "@react-navigation/native";

const getMenuItems = (getString: (key: string) => string) => [
  {
    title: getString("My Profile"),
    iconName: "md-person",
    navigateToScreen: NavigationNames.ProfileScreen,
    forward:true
  },
  /* {
    title: getString("Events"),
    iconName: "ios-musical-notes",
    navigateToScreen: NavigationNames.EventListScreen,
    forward:true
  },
  {
    title: getString("Blog"),
    iconName: "ios-paper",
    navigateToScreen: NavigationNames.MemberProfileScreen,
    forward:true
  }, */
  {
    title: getString("My Bank"),
    iconName: "ios-archive",
    navigateToScreen: NavigationNames.BankInfoScreen,
    forward:true
  },
  {
    title: getString("My HMO"),
    iconName: "ios-information",
    navigateToScreen: NavigationNames.HMOScreen,
    forward:true
  },
  {
    title: getString("Prescriptions"),
    iconName: "ios-list",
     navigateToScreen: NavigationNames.PrescriptionsScreen,
    forward:true
  },
  {
    title: getString("Referrals"),
    iconName: "ios-return-right",
    navigateToScreen: NavigationNames.ReferralsScreen,
    forward:true
  },
  {
    title: getString("Account Settings"),
    iconName: "md-settings",
    navigateToScreen: NavigationNames.SettingsScreen,
    //openSettings: true,
    forward:true
  }
  ,
  {
    title: getString("Log out"),
    iconName: "ios-power",
    navigateToScreen: NavigationNames.LoginTab,
    forward:false
  }
];


const getProviderMenuItems = (getString: (key: string) => string) => [
  {
    title: getString("My Profile"),
    iconName: "md-person",
    navigateToScreen: NavigationNames.ProfileScreen,
    forward:true
  },
  {
    title: getString("Prescriptions"),
    iconName: "ios-list",
     navigateToScreen: NavigationNames.PrescriptionsScreen,
    forward:true
  },
  {
    title: getString("Referrals"),
    iconName: "ios-return-right",
    navigateToScreen: NavigationNames.ReferralsScreen,
    forward:true
  },
  {
    title: getString("My Availability"),
    iconName: "ios-time",
    navigateToScreen: NavigationNames.ProviderAvailabilityScreen,
    forward:true
  },
  {
    title: getString("My Service Costs"),
    iconName: "ios-cash",
    navigateToScreen: NavigationNames.ServiceCostScreen,
    forward:true
  },
  {
    title: getString("Account Settings"),
    iconName: "md-settings",
    navigateToScreen: NavigationNames.SettingsScreen,
    //openSettings: true,
    forward:true
  }
  ,
  {
    title: getString("Log out"),
    iconName: "ios-power",
    navigateToScreen: NavigationNames.LoginTab,
    forward:false
  }
];
//
type TProps = {};

export const MenuScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const [profile, setProfile] = useState(null);
  const [isVisibleSettingModal, setIsVisibleSettingModal] = useState(false);
  const [menuItems,setMenuItems]=useState([]);

  //const menuItems = getProviderMenuItems(getString);



  useEffect(() => {
    async function load_profile() {
      let profile = await AsyncStorage.getItem('profile')
      .then((data) => {
        setProfile(JSON.parse(data));
    })
    .catch((err) => {
       console.log(err);
    });   
    }
   load_profile();
  }, []);


  useEffect(() => {
    if (profile != null){
      if (profile.role=="clinician"){
        setMenuItems(getProviderMenuItems(getString));
      }else if (profile.role=="client"){
        setMenuItems(getMenuItems(getString));
      }
    }
  
  
  }, [profile]);


  const onPressMenuItemClick = (item: any) => {
    if (item.openSettings) {
      setIsVisibleSettingModal(true);
    } else if (item.navigateToScreen) {
      navigation.navigate(item.navigateToScreen);
    }
  };

  return (
    <>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => `key${index}ForMenu`}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => onPressMenuItemClick(item)}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={item.iconName}
                  size={24}
                  color={Theme.colors.gray}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.titleText}>{item.title}</Text>
              {item.forward && 
                <Ionicons
                  name="ios-arrow-forward"
                  size={24}
                  color={Theme.colors.gray}
                />
             }
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
      <SettingsBottomSheet
        isVisible={isVisibleSettingModal}
        onDismissModal={() => setIsVisibleSettingModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: {
    flex: 1
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingEnd: 18,
    paddingStart: 0
  },
  iconContainer: {
    width: 60,
    alignSelf: "center"
  },
  icon: { alignSelf: "center" },
  titleText: {
    flex: 1,
    alignSelf: "center",
    color: Theme.colors.black,
    fontSize: 17
  }
});
