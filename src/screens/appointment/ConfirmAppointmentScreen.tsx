import React, { useState } from "react";
import { View, Text, Picker, StyleSheet, TextInput } from 'react-native';
import { Theme } from "../../theme";
import { Button } from "../../components/buttons";
import { useLocalization } from "../../localization";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";

type TProps = {};

export const ConfirmAppointmentScreen: React.FC<TProps> = props => {
  const [selectedValue, setSelectedValue] = useState("java");
  const navigation = useNavigation();
  const route = useRoute()
  const { getString } = useLocalization();
  const [appointmentDate, setAppointmentDate] = useState(new Date());

    //datepicker related 
    const [date, setDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date: Date) => {
      let datestring = Moment(date).format('DD-MM-YYYY')
      setDate(datestring);
      setAppointmentDate(date)
      hideDatePicker();
    };


  let appointmentModel = JSON.parse(route.params["appointmentModel"]) as NewAppointmentModel;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Selected Doctor</Text>

      <TextInput
        style={styles.input}
        placeholder="Selected Doctor"
        editable={false}
        value={appointmentModel.doctor.fullName}

      />

      <Text style={styles.titleText}>Select Service</Text>
      <View style={styles.pickerstyle}>

        <Picker
          selectedValue={selectedValue}

          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

        >
          <Picker.Item label="Select Service" value="Select Service" />
        </Picker>
      </View>

      <View>
        <Text style={styles.titleText}>Your Preferred Appointment Time ?</Text>
        <View style={styles.calendarSection}>
          <Ionicons style={styles.calendarIcon} name="ios-calendar" size={40} color="#000" onTouchStart={showDatePicker} />
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            pointerEvents="none"
            onTouchStart={showDatePicker}
            autoFocus={false}
            value={date}
          />
                <View style={styles.pickerstyle2}>
      <Picker
  selectedValue={selectedValue}
  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
>
  <Picker.Item label="Select Time" value="Select Time" />
</Picker>
      </View>
        </View>

      </View>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <Button
        title={getString("Check Availability")}
        type="outline"
        style={styles.buttonStyle}
      />

<Text style={styles.titleText}>Make Payment</Text>

<View style={{flex:1, flexDirection:"row"}}>
<TextInput
        style={{height:50, width:"40%", borderWidth: 1,
        borderRadius: 5,
        borderColor: Theme.colors.primaryColor,
        padding: 10, marginRight:"5%"}}
        placeholder="Amount"
        editable={false}
      />
      <Button
        title={getString("Make Payment")}
        type="outline"
        style={{height:50, width:"50%"}}
      />
</View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  titleText: {
    fontSize: 17,
    fontWeight: "600",
    color: Theme.colors.black,
    margin: 10
  },
  pickerstyle: {
    height: 50,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: Theme.colors.primaryColor,
    borderRadius: 5
  },
  pickerstyle2: {
    height: 50,
    width:"50%",
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: Theme.colors.primaryColor,
    borderRadius: 5,  
    marginTop: 10,
    marginLeft : 20,
  },

  buttonStyle: {
    marginTop: 30,
    alignSelf: 'stretch',
    fontSize: 20,
    height: 50
  },
  input: {
    height: 50,
    width:"auto",
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Theme.colors.primaryColor,
    padding: 10,
    marginTop: 10
  },
  calendarSection: {
    flexDirection: "row",
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width:"100%",
    marginRight: 10
  },
  calendarIcon: {
    padding: 10,
  },
  timeSection: {
   flex:1,
   flexDirection:"row" 
  
  },
});