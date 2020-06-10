import React, { useState } from "react";
import { View, Text, Picker, StyleSheet, TextInput } from 'react-native';
import { Theme } from "../../theme";
import { Button } from "../../components/buttons";
import { useLocalization } from "../../localization";
import { useNavigation } from "@react-navigation/native";

type TProps = {};

export const ConfirmAppointmentScreen: React.FC<TProps> = props => {
    const [selectedValue, setSelectedValue] = useState("java");
    const navigation = useNavigation();
    const { getString } = useLocalization();
    return (
        <View style={styles.container}>
            

            <Text style={styles.titleText}>Select Service</Text>
            <View  style={styles.pickerstyle}>
            <Picker
            selectedValue={selectedValue}
           
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>

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
        marginTop:30
            },
  });