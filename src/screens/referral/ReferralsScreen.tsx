import React, { Component,useState,useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView ,AsyncStorage,ActivityIndicator} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Divider, TouchableHighlight,MemberItemRow,DoctorItemRow } from "../../components";
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

export const ReferralsScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [referrals, setReferrals] = useState([]);

 
  const onPressMemberSearch = () => {
    navigation.navigate(NavigationNames.MemberSearchScreen,{
      page_request: "referral",
    });
  };

  const get_referrals = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/referral/getreferrals", request)
      .then((response) => response.json())
      .then(responseJson => {
        setReferrals(responseJson);
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
      get_referrals();
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
                    <ActivityIndicator size='large' color='#2D9CDB' />}

          {referrals.map((item, index) => {
                  return (
                    <TouchableHighlight key={index}  onPress={() =>
                      navigation.navigate(NavigationNames.ReferralScreen, {
                        referral: JSON.stringify(item),
                      })
                    }>
                    <View>
                       

                        {profile.role=="clinician" &&
                         <MemberItemRow item={item.profile}/>
                        }
                        
                        {profile.role=="client" &&
                         <DoctorItemRow item={item.clinician}/>
                        }
                        <Text style={styles.daysText}>{item.profile_match.appointment_type}</Text>
                        <Text style={styles.daysText}>{item.profile_match.appointment_activity}</Text>
                        <Text style={styles.daysText}>{item.profile_match.appointment_activity_sub}</Text>
                        <Text style={styles.daysText}>Referred by: {item.referred_by} {moment(item.created_at).fromNow()}</Text>

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
  scrollContainer: { paddingVertical: 16,marginLeft:10,marginRight:10 },
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
