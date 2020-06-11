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
      const appointment: NewAppointmentModel = {
        appointmentType:getString(appointmentType),
        appointmentCategory:getString(appointmentCategory),
        appointmentActivity:getString(appointmentActivity)
        }
      navigation.navigate(NavigationNames.AvailableClinicianScreen, {appointmentModel : JSON.stringify(appointment)})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>What type of appointment are you setting up?</Text>
            <View  style={styles.pickerstyle}>
            <Picker           
            onValueChange={(itemValue, itemIndex) => setAppointmentType(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
            </View>

            <Text style={styles.titleText}>What is the category of the appointment?</Text>
            <View  style={styles.pickerstyle}>
            <Picker
         
           
            onValueChange={(itemValue, itemIndex) => setAppointmentCategory(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
            </View>

            <Text style={styles.titleText}>Please specify the activity for the appointment</Text>
            <View  style={styles.pickerstyle}>
            <Picker
           
           
            onValueChange={(itemValue, itemIndex) => setAppointmentActivity(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
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