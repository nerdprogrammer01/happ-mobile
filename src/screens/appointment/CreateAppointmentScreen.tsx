import React, { useState } from "react";
import { View, Text, Picker, StyleSheet,TouchableOpacity, TextInput, Platform } from 'react-native';
import { Theme } from "../../theme";
import { Button } from "../../components/buttons";
import { useLocalization } from "../../localization";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


type TProps = {};

export const CreateAppointmentScreen: React.FC<TProps> = props => {
    const { getString } = useLocalization();
    const navigation = useNavigation();
    const [appointmentType, setAppointmentType] = useState(0);
    const [appointmentCategory, setAppointmentCategory] = useState(0);
    const [appointmentActivity, setAppointmentActivity] = useState(0);

    //datepicker related 
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };

    const DateTimeHandler = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(true);
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      
      if(mode == "date"){
        showTimepicker
      }
        
    };
  
    const nextForm  = () => {
      let appointment: NewAppointmentModel = {
        appointmentType: parseInt(appointmentType.toString()),
        appointmentCategory:parseInt(appointmentCategory.toString()),
        appointmentActivity:parseInt(appointmentActivity.toString())
        }

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appointment)
      }

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
     
            <View>
            <Text style={styles.titleText}>What time is convienent for you ?</Text>
            <TextInput
  style={{
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }}
  underlineColorAndroid="transparent"
  placeholder="date ap"
  pointerEvents="none"
  onTouchStart={showDatepicker}
  autoFocus={false}
/>
            </View>
<View>
{show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={DateTimeHandler}
        />
      )}
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
        marginTop:20,
        marginRight:10,
        alignSelf: 'stretch',
        fontSize: 20,
    },  input: {
      height: 50,
     // width: '90%',
     alignSelf: 'stretch',
      borderRadius: 5,
      borderColor: Theme.colors.primaryColor,
      borderWidth: 1,
      padding: 10,
      marginTop:10,
      marginRight: 10
  },
  });