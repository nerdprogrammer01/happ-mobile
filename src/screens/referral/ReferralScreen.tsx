import React, { Component,useState,useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView ,AsyncStorage,ActivityIndicator} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Divider, TouchableHighlight,DoctorItemRow } from "../../components";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization";
import {
  UpcomingAppoinmentRow,SectionHeader
} from "../../components";
import { DashboardItemsModel, PersonModel } from "../../models";
import { DashboardService } from "../../services";
import { useNavigation,useRoute } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { FabButton, Button } from "../../components/buttons";
import {Environment} from "../../datas";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import moment from "moment";

type TProps = {};

export const ReferralScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const referral =JSON.parse(route.params["referral"])

 
  const onPressMemberSearch = () => {
    navigation.navigate(NavigationNames.MemberSearchScreen,{
      page_request: "prescription",
    });
  };

  const get_prescriptions = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/prescription/get", request)
      .then((response) => response.json())
      .then(responseJson => {
        //setPrescriptions(responseJson);
        setLoading(false);
      })
      .catch(error => {
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
      //get_prescriptions();
    }
  
  
  }, [profile]);

  if (profile === null) {
    return <Text>Loading</Text>;
  }



  return (

            <SafeAreaView style={styles.flex1}>
            <ScrollView
              style={styles.flex1}
              contentContainerStyle={styles.scrollContainer}
            >
                {profile.role=="client" &&

                        <View>
                        <Avatar
                            imageStyle={styles.imageStyle}
                            source={{
                            uri:
                                Environment.SERVER_API+referral.clinician.imageUrl
                            }}
                        />
                        <Text style={styles.nameText}>{referral.clinician.fullName}</Text>
                        <Text  style={styles.daysText}>{referral.clinician.title}</Text>
                        </View>
                 

                }

                {profile.role=="clinician" &&
                    // <DoctorItemRow item={prescription.profile} />

                    <View>
                    <Avatar
                        imageStyle={styles.imageStyle}
                        source={{
                        uri:
                            Environment.SERVER_API+referral.profile.imageUrl
                        }}
                    />
                    <Text style={styles.nameText}>{referral.profile.fullName}</Text>
                    <Text  style={styles.daysText}>{referral.profile.title}</Text>
                    </View>
                }
                
                <Text style={styles.daysText}>{moment(referral.created_at).fromNow()}</Text>
                
                <Divider style={{marginTop:15}}/>

                <Text style={[styles.nameText,{color:Theme.colors.primaryColor}]}>Service referred to </Text>

                <Text style={[styles.daysText,{fontSize:20,color:Theme.colors.black}]}>{referral.profile_match.appointment_type}</Text>
                <Text style={[styles.daysText,{fontSize:20,color:Theme.colors.black}]}>{referral.profile_match.appointment_activity}</Text>
                <Text style={[styles.daysText,{fontSize:20,color:Theme.colors.black}]}>{referral.profile_match.appointment_activity_sub}</Text>

   
            </ScrollView>
           
          </SafeAreaView>


  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 16 },
  imageStyle: {
    width: 70,
    height: 70,
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
  px_nameText: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.black
  },
  titleText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "400",
    marginTop: 12,
    marginBottom:10,
    color: Theme.colors.primaryColor
  },
  drug_titleText: {
    fontSize: 18,
    fontWeight: "400",
    margin: 10,
    color: Theme.colors.black
  },
  drug_nameText: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 10,
    color: Theme.colors.primaryColor
  },
  dosage_nameText: {
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 10,
    marginBottom:5,
    color: Theme.colors.black
  },
  daysText: {
    alignSelf: "center",
    fontSize: 14,
    color: Theme.colors.black
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
  divider: { marginStart: 16,marginEnd:1 },
  upcomingAppoinmentRow: {
    margin:5,
    marginHorizontal: 16
  }
});
