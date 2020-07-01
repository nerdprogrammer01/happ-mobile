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

type TProps = {};

export const MemberProfileScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [appointment_types, setAppointmentTypes] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const onPressNewAppointment = () => {
    navigation.navigate(NavigationNames.CreateAppointmentScreen);
  };

  const onPressAppointment = () => {
    navigation.navigate(NavigationNames.AppointmentScreen);
  };

  const getAppointmentTypes = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentTypes", request)
      .then((response) => response.json())
      .then(responseJson => {
        setAppointmentTypes(responseJson);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getAppointments = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Token': profile.token
      }
    };

    
    fetch(Environment.SERVER_API+"/api/appointment/GetAppointments", request)
      .then(async response => 
        {
          console.log(JSON.stringify(response, null, 4));
          return await response.json();
        })
      .then(responseJson => {

        setAppointments(responseJson);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        alert(error);
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
      if (profile.role=="client"){
        getAppointmentTypes();
      }else if (profile.role=="clinician"){
        getAppointments();
      }
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
              <Avatar
                imageStyle={styles.imageStyle}
                source={{
                  uri:
                    // "https://raw.githubusercontent.com/publsoft/publsoft.github.io/master/projects/dentist-demo/assets/images/profile_photo.png"
                    Environment.SERVER_API+profile.imageUrl
                }}
              />
              <Text style={styles.nameText}>{profile.fullName}</Text>
              <Text  style={styles.daysText}>{profile.title}</Text>
      
             
          {profile.role=="client" &&
          <View>
       <Text style={styles.titleText}>WHAT DO YOU WANT TO DO TODAY?</Text>
              <View style={{ marginTop: 14 }} >
                {appointment_types.map((item, index) => {
                  return (
                    <TouchableHighlight key={index} onPress={onPressNewAppointment}>
                      <View>
                        <View style={styles.menuRowContent} >
                          <View style={styles.iconContent}>
                         {/*    <Ionicons
                              name={item.iconName}
                              size={26}
                              color={item.iconColor}
                                                            style={{ alignSelf: "center" }}
                            /> */}
                          </View>
                          <View style={styles.menuRowsContent}>
      
                            <Text  style={styles.menuRowTitle}>{item.name}</Text>
                           {/*  <Ionicons
                              name={item.iconName}
                              size={16}
                              color={item.iconColor}
                              style={{ alignSelf: "center" }}
                            /> */}
                             <Ionicons
                              name={"md-calendar"}
                              size={16}
                              color={Theme.colors.primaryColor}
                              style={{ alignSelf: "center" }}
                            />
                            <Text style={styles.menuRowSubtitle}>
                             Schedule Appointment
                            </Text>
                           
                          </View>
                         {/*  <Ionicons
                            name="ios-arrow-forward"
                            size={24}
                            color={Theme.colors.primaryColor}
                            style={{ alignSelf: "center" }}
                          /> */}
                        </View>
                        {/* <Divider style={styles.divider} /> */}
                      </View>
                    </TouchableHighlight>
                  );
                })}
               
              </View>
              </View>
}

{profile.role=="clinician" &&
<View>
<Text style={styles.titleText}>Today's Appointments</Text>
{isLoading &&
                    <ActivityIndicator size='large' color='#2D9CDB' />
                }
{appointments.map((item, index) => {
                  return (
                    <TouchableHighlight key={index} 

                    onPress={() =>
                      navigation.navigate(NavigationNames.AppointmentScreen, {
                        appointment: JSON.stringify(item),
                      })
                    }
                   >
                      <View>
                      <UpcomingAppoinmentRow
        style={styles.upcomingAppoinmentRow}
        item={item} role={profile.role}
      /> 
      {/* <Divider style={styles.divider} /> */}
                      </View>
                    </TouchableHighlight>
                  );
                })}
</View>
}
            </ScrollView>
           
          </SafeAreaView>


  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 16 },
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
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "400",
    marginTop: 12,
    marginBottom:10,
    color: Theme.colors.primaryColor
  },
  daysText: {
    alignSelf: "center",
    fontSize: 14,
    marginTop: 6,
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
  divider: { marginStart: 16,marginEnd:16,backgroundColor:"#ADDFFF" },
  upcomingAppoinmentRow: {
    margin:5,
    marginHorizontal: 16
  }
});
