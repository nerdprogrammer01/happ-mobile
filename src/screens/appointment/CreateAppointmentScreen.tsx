import React, { useState } from "react";
import { View, Text, Picker, StyleSheet,TextInput } from 'react-native';
import { Theme } from "../../theme";
import { Button } from "../../components/buttons";
import { useLocalization } from "../../localization";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";


type TProps = {};

export const CreateAppointmentScreen: React.FC<TProps> = props => {
   
    const [appointmentType, setAppointmentType] = useState();
    const [appointmentCategory, setAppointmentCategory] = useState();
    const [appointmentActivity, setAppointmentActivity] = useState();
    
    const { getString } = useLocalization();
    const navigation = useNavigation();
    
    const nextForm  = () => {
      let appointment: NewAppointmentModel = {
        appointmentType: parseInt(appointmentType),
        appointmentCategory:parseInt(appointmentCategory),
        appointmentActivity:parseInt(appointmentActivity)
        }

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appointment)
      };

      fetch('https://myspace-mytime.com/api/clinician/getavailabledoctors', requestOptions)
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        navigation.navigate(NavigationNames.AvailableClinicianScreen, {appointmentModel : JSON.stringify(appointment), doctors : JSON.stringify(data)});
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
          // .then(response => response.json())
          // .then(data => {setDoctorList(data); console.log(data)});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>What type of appointment are you setting up?</Text>
            <View  style={styles.pickerstyle}>
            <Picker           
            onValueChange={(itemValue, itemIndex) => setAppointmentType(itemValue)}
          >
            <Picker.Item label="Select Type" value="0" />
            <Picker.Item label="Java" value="1" />
            <Picker.Item label="JavaScript" value="2" />
          </Picker>
            </View>

            <Text style={styles.titleText}>What is the category of the appointment?</Text>
            <View  style={styles.pickerstyle}>
            <Picker
         
           
            onValueChange={(itemValue, itemIndex) => setAppointmentCategory(itemValue)}
          >
            <Picker.Item label="Select Category" value="0" />
            <Picker.Item label="Java" value="1" />
            <Picker.Item label="JavaScript" value="2" />
          </Picker>
            </View>

            <Text style={styles.titleText}>Please specify the activity for the appointment</Text>
            <View  style={styles.pickerstyle}>
            <Picker
           
           
            onValueChange={(itemValue, itemIndex) => setAppointmentActivity(itemValue)}
          >
            <Picker.Item label="Select Activity" value="0" />
            <Picker.Item label="Java" value="1" />
            <Picker.Item label="JavaScript" value="2" />
          </Picker>
            </View>
     
            <Button
                  title={getString("Continue")}
                  onPress = {nextForm}
                  type="outline"
                    style={styles.buttonStyle}
                />
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    paddingLeft:10
    },
    titleText: {
        fontSize: 17,
        fontWeight: "600",
        color: Theme.colors.black,
        paddingTop:20
      },
    pickerstyle:{
        height: 50, 
        alignSelf: 'stretch',
        borderWidth:1,
        borderColor: Theme.colors.primaryColor,
        borderRadius:5,
        marginTop:10,
        marginRight:10
    },
    buttonStyle:{
        marginTop:10,
        marginRight:10,
        alignSelf: 'stretch',
        fontSize: 20,
    }
  });