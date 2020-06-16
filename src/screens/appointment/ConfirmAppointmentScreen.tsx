import React, { useState } from "react";
import { View, Text, Picker, StyleSheet, TextInput } from 'react-native';
import { Theme } from "../../theme";
import { Button } from "../../components/buttons";
import { useLocalization } from "../../localization";
import { useNavigation,useRoute } from "@react-navigation/native";
import {NewAppointmentModel} from "../../models/NewAppointmentModel";

type TProps = {};

export const ConfirmAppointmentScreen: React.FC<TProps> = props => {
    const [selectedValue, setSelectedValue] = useState("java");
    const navigation = useNavigation();
    const route = useRoute()
    const { getString } = useLocalization();
    let appointmentModel = JSON.parse(route.params["appointmentModel"]) as NewAppointmentModel;

    return (
        <View style={styles.container}>
           <Text style={styles.titleText}>Selected Doctor</Text>
         
          <TextInput
                    style={styles.input}
                    placeholder="Selected Doctor"
                    editable = {false}
                    value = {appointmentModel.doctor.fullName}

                />
      
            <Text style={styles.titleText}>Select Service</Text>
            <View  style={styles.pickerstyle}>

            <Picker
            selectedValue={selectedValue}
           
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
            </View>
            <Text style={styles.titleText}>Service Charge</Text>

            <TextInput
                    style={styles.input}
                    placeholder="Amount"
                />

            <Button
                  title={getString("Pay")}
                  type="outline"
                    style={styles.buttonStyle}
                />

        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    padding:10
    },
    titleText: {
        fontSize: 17,
        fontWeight: "600",
        color: Theme.colors.black,
        margin:10
      },
    pickerstyle:{
        height: 50, 
        alignSelf: 'stretch',
        borderWidth:1,
        borderColor: Theme.colors.primaryColor,
        borderRadius:5,
        
      
    },
    buttonStyle:{
        marginTop:30,       
        alignSelf: 'stretch',
        fontSize: 20,
        height: 50
    },   
    input: {
        height: 50,
        alignSelf: 'stretch',
        borderWidth:0.5,
        borderColor: Theme.colors.primaryColor,
        padding:10,
        marginTop:10
      
            },
  });