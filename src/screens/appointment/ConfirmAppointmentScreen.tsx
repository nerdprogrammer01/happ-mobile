import React, { useState, useEffect } from "react";
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
import { Environment } from "../../datas/Config";
import { DoctorServicesModel } from "../../models/DoctorServicesModel";
import { DoctorsService } from "../../services";
import {Times} from "../../datas/Times";



type TProps = {};

export const ConfirmAppointmentScreen: React.FC<TProps> = props => {
  const [serviceId, setServiceId] = useState(0);
  const navigation = useNavigation();
  const route = useRoute()
  const { getString } = useLocalization();
  const  [doctorServices, setDoctorServices] = useState([] as DoctorServicesModel[]);
  const [amount, setAmount] = useState(0.00);

  let appointmentModel = JSON.parse(route.params["appointmentModel"]) as NewAppointmentModel;
  
  const getClinicianServices = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };
   
    fetch(Environment.SERVER_API+"/api/clinician/GetClinicianServices?clinician_id="+appointmentModel.doctor.id, request)
      .then((response) =>{ 
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        setDoctorServices(responseJson as DoctorServicesModel[])       
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getServiceCost = (service_id : number) => {
    
    setServiceId(service_id)

    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };
   
    fetch(Environment.SERVER_API+"/api/servicecost/GetClinicianServiceCost?service_id="+service_id+"&clinician_id="+appointmentModel.doctor.id, request)
      .then((response) =>{ 
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson.cost);
        setAmount(responseJson.cost)
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    getClinicianServices();
    }, []);

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
          onValueChange={(itemValue, itemIndex) => getServiceCost(itemValue)} selectedValue={serviceId}
        >
          <Picker.Item label="Select Service" value={0} />
          { doctorServices.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}

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
      <Picker>
  <Picker.Item label="Select Time" value="Select Time" />
  { Times.map((item, key)=>(
            <Picker.Item label={item} value={item} key={key} />)
            )}

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
        value = {amount.toString()}
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