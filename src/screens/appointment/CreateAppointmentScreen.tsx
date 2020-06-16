import React, { useState ,useEffect} from "react";
import { View, Text, Picker, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme";
import { Button } from "../../components/buttons";
import { useLocalization } from "../../localization";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import {Environment} from "../../datas";

type TProps = {};

export const CreateAppointmentScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [appointmentType, setAppointmentType] = useState(0);
  const [appointmentCategory, setAppointmentCategory] = useState(0);
  const [appointmentActivity, setAppointmentActivity] = useState(0);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointment_types, setAppointmentTypes] = useState([]);
  const [appointment_categories, setAppointmentCategories] = useState([]);
  const [appointment_activities, setAppointmentActivities] = useState([]);

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
    let datestring = Moment(date).format('DD-MM-YYYY hh:mm:ss a')
    setDate(datestring);
    setAppointmentDate(date)
    hideDatePicker();
  };

  const nextForm = () => {
    let appointment: NewAppointmentModel = {
      appointmentType: parseInt(appointmentType.toString()),
      appointmentCategory: parseInt(appointmentCategory.toString()),
      appointmentActivity: parseInt(appointmentActivity.toString()),
      appointmentDate: appointmentDate
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
        navigation.navigate(NavigationNames.AvailableClinicianScreen, { appointmentModel: JSON.stringify(appointment), doctors: JSON.stringify(data) });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  useEffect(() => {
   getAppointmentTypes();
  }, []);

  useEffect(() => {
    if (appointmentType > 0 && appointmentType != null){
      getAppointmentCategories();
    }
    
   }, [appointmentType]);

  
  const getAppointmentTypes = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentTypes", request)
      .then((response) => response.json())
      .then(responseJson => {
        setAppointmentTypes(responseJson);
       
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getAppointmentCategories = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentActivities?parent_id="+appointmentType, request)
      .then((response) =>{ 
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        setAppointmentCategories(responseJson);
       
      })
      .catch(error => {
        console.error(error);
      });
  }


  const getAppointmentActivities = (appointment_cateogory_id:number) => {
    //alert(appointment_cateogory_id);
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentSubActivities?parent_id="+appointment_cateogory_id, request)
      .then(async response => {
        console.log(JSON.stringify(response, null, 4));
        //alert(response);
        return await response.json();
        
      })
      .then(responseJson => {
        setAppointmentActivities(responseJson);
        setAppointmentCategory(appointment_cateogory_id);
      })
      .catch(error => {
        console.error(error);
       
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>What type of appointment are you setting up?</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setAppointmentType(itemValue)} selectedValue={appointmentType}
        >
         
          { appointment_types.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        </Picker>
      </View>
      <Text style={styles.titleText}>What is the category of the appointment?</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => getAppointmentActivities(itemValue)} selectedValue={appointmentCategory}
        >
           { appointment_categories.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
          {/* <Picker.Item label="Select Category" value="0" />
          <Picker.Item label="Java" value="1" />
          <Picker.Item label="JavaScript" value="2" /> */}
        </Picker>
      </View>
      <Text style={styles.titleText}>Please specify the activity for the appointment</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setAppointmentActivity(itemValue)} selectedValue={appointmentActivity}
        >
           { appointment_activities.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
          {/* <Picker.Item label="Select Activity" value="0" />
          <Picker.Item label="Java" value="1" />
          <Picker.Item label="JavaScript" value="2" /> */}
        </Picker>
      </View>
      <View>
        <Text style={styles.titleText}>What time is convienent for you ?</Text>
        <View style={styles.calendarSection} onTouchStart={showDatePicker}>
          <Ionicons style={styles.calendarIcon} name="ios-calendar" size={40} color="#000" onTouchStart={showDatePicker} />
          <TextInput
            style={styles.input}
            placeholder="Select Time"
            pointerEvents="none"
            onTouchStart={showDatePicker}
            autoFocus={false}
            value={date}
          />
        </View>

      </View>
      <View>
      {/*   <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        /> */}
      </View>
      <Button
        title={getString("Continue")}
        onPress={nextForm}
        type="outline"
        style={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingLeft: 10
  },
  titleText: {
    fontSize: 17,
    fontWeight: "600",
    color: Theme.colors.black,
    paddingTop: 20
  },
  pickerstyle: {
    height: 50,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: Theme.colors.primaryColor,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  buttonStyle: {
    marginTop: 20,
    marginRight: 10,
    alignSelf: 'stretch',
    fontSize: 20,
  },
  calendarSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    marginRight: 10
  },
  calendarIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 10,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 5,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 1,
  }
});