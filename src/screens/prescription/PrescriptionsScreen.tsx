import React, { Component,useState,useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView ,AsyncStorage,ActivityIndicator} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Divider, TouchableHighlight } from "../../components";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization";
import {
  UpcomingAppoinmentRow,SectionHeader
} from "../../components";
import { DashboardItemsModel, PersonModel } from "../../models";
import { DashboardService } from "../../services";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { FabButton, Button } from "../../components/buttons";
import {Environment} from "../../datas";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import moment from "moment";

type TProps = {};

export const PrescriptionsScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

 
  const onPressMemberSearch = () => {
    navigation.navigate(NavigationNames.MemberSearchScreen,{
      page_request: "prescription",
    });
  };
  //console.log(prescriptions);
  const get_prescriptions = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      }
    };
    console.log("token is:"+ 'Bearer '+profile.token)
   console.log(Environment.SERVER_API+"/api/prescription/get")
    fetch(Environment.SERVER_API+"/api/prescription/get", request)
      .then((response) => response.json())
      .then(responseJson => {
        setPrescriptions(responseJson);
        setLoading(false);
      })
      .catch(error => {
        alert(error);
        console.error(error);
      });
  }


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
      get_prescriptions();
    }
  
  
  }, [profile]);

  if (profile === null) {
    return <Text>Loading</Text>;
  }

  if (profile.role=="clinician"){
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
         {/*  <Item title={getString("Cancel")}  /> */}
         <Button
          onPress={() => onPressMemberSearch()}
          title={getString("New")}
  
        />
        </HeaderButtons>
      )
    });
  }
    


  return (

            <SafeAreaView style={styles.flex1}>
            <ScrollView
              style={styles.flex1}
              contentContainerStyle={styles.scrollContainer}
            >
          
          {isLoading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />}

          {prescriptions.map((item, index) => {
                  return (
                    <TouchableHighlight key={index}  onPress={() =>
                      navigation.navigate(NavigationNames.PrescriptionScreen, {
                        prescription: JSON.stringify(item)
                      })
                    }>
                    <View>
                       

                        {profile.role=="clinician" &&
                         <Text style={styles.titleText}>{item.profile.fullName}</Text>
                         
                        }
                        
                        {profile.role=="client" &&
                         <Text style={styles.titleText}>From {item.clinician.fullName}</Text>
                        }
                         <Text style={styles.daysText}>{moment(item.created_at).fromNow()} - {item.drug_count} drugs</Text>
                        <Divider style={styles.divider} />
                      </View>
                  </TouchableHighlight>
                  );
                })}

   
            </ScrollView>
           
          </SafeAreaView>


  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 0 },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: 16
  },
  nameText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 16,
    color: Theme.colors.black
  },
  titleText: {
    fontSize: 18,
    fontWeight: "400",
    margin: 10,
    color: Theme.colors.primaryColor
  },
  daysText: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom:5,
    color: Theme.colors.black,
  },
  menuRowContent: {
    flexDirection: "row",
   /*  paddingStart: 12, */
    paddingEnd: 16,
    paddingVertical: 16,
  /*   marginBottom:16,
    marginTop:16, */
    borderWidth:1,
    borderColor:Theme.colors.gray,
    margin:16,
    borderRadius:5
  },
  iconContent: {
    width: 32
  },
  menuRowsContent: { paddingHorizontal: 8, flex: 1 },
  menuRowTitle: {
    fontSize: 25,
    alignSelf: "center",
  },
  menuRowSubtitle: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: "center",
    fontWeight: "800",
    color:Theme.colors.primaryColorDark
  },
  divider: { marginStart: 16,marginEnd:16 },
  upcomingAppoinmentRow: {
    margin:5,
    marginHorizontal: 16
  }
});
