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
import { TextInput } from "react-native-gesture-handler";

type TProps = {};

export const EditProfileScreen: React.FC<TProps> = props => {
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
              <Text style={{fontSize:20}}>Phone Number</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Enter Phone Number"
                />

            </ScrollView>
           
          </SafeAreaView>


  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 16 },
  input: {
    height: 50,
    width: '90%',
    borderRadius: 10,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 1,
    padding: 10,
    alignSelf:"center"
//    margin: 10
}
});
