import React, { useState, useEffect } from "react";
import { View, Text, Picker, StyleSheet, TextInput, AsyncStorage, ActivityIndicator,Platform } from 'react-native';
import { Theme } from "../../theme";
import { Button, ButtonPrimary } from "../../components/buttons";
import { useLocalization } from "../../localization";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { ScrollView} from "react-native-gesture-handler";
import { Environment } from "../../datas/Config";
import { DoctorServicesModel } from "../../models/DoctorServicesModel";
import NavigationNames from "../../navigations/NavigationNames";
import { DoctorItemRow } from "../../components";

type TProps = {};

export const ConfirmAppointmentScreen: React.FC<TProps> = props => {
  const [serviceId, setServiceId] = useState("");
  const navigation = useNavigation();
  const route = useRoute()
  const { getString } = useLocalization();
  const [doctorServices, setDoctorServices] = useState([] as DoctorServicesModel[]);
  const [amount, setAmount] = useState(0.00);
  const [available, setAvailable] = useState(false)
  const [appointmentTime, setAppointmentTime] = useState("");
  const [servicePeriod, setServicePeriod] = useState(0)
  const [start_date, setStart_date] = useState(null)
  const [end_date, setEnd_date] = useState(null)
  const [profile, setProfile] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("Select a time and we will let you know if your doctor is available");
  const [loading, setLoading] = useState(false);
  const [availabilityList,setAvailabilityList]=useState([]);

  useEffect(() => {
    async function load_profile() {
      await AsyncStorage.getItem('profile')
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
    if(profile != null){
      getClinicianServices();
    }

}, [profile]);

    //datepicker related 
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    // const handleConfirm = (date: Date) => {
    //   let datestring = Moment(date).format('YYYY-MM-DD')
    //   setDate(datestring);
    //   hideDatePicker();
      
    // };

    const onChange = (selectedDate) => {
      const currentDate = selectedDate || date;
      let datestring = Moment(currentDate).format('DD-MM-YYYY');
      setDatePickerVisibility(Platform.OS === 'ios');
      setDate(datestring);
      setDatePickerVisibility(false);
    };


  let appointmentModel = JSON.parse(route.params["appointmentModel"]) as NewAppointmentModel;

  const getClinicianServices = () => {
    setLoading(true);
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      }
    };

    fetch(Environment.SERVER_API + "/api/clinician/GetClinicianServices?clinician_id=" + appointmentModel.doctor.id, request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        setDoctorServices(responseJson as DoctorServicesModel[])
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  
  }

  const getServiceCost = (service_id: string) => {

    setServiceId(service_id);
    setLoading(true);

    doctorServices.filter(function(service) {
      if(service.id == service_id){      
        return setServicePeriod(service.time_minutes)
      } 
    })

    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      }
    };

    fetch(Environment.SERVER_API + "/api/servicecost/GetClinicianServiceCost?service_id=" + service_id + "&clinician_id=" + appointmentModel.doctor.id + "&appointment_activity_sub_id="+appointmentModel.appointmentActivity, request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        setAmount(responseJson.cost)
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const checkAvailability = (timeString : string) => {
    setAppointmentTime(timeString);

    if(date != null && servicePeriod > 0){
      var start_date = Moment(date.trim()+" "+appointmentTime.trim()+":00", 'DD-MM-YYYY hh:mm:ss').format()
      var end_date = Moment(start_date).add(servicePeriod, 'minutes').format();
      
      setStart_date(start_date)
      setEnd_date(end_date)

      let requestBody = JSON.stringify({
        client_id: profile.id,
        clinician_id: appointmentModel.doctor.id,
        status:0,
        appointment_type:appointmentModel.appointmentType,
        start_date : start_date,
        end_date : end_date,
        created_at : new Date(),
        appointment_service:serviceId,
        appointment_activity_id:appointmentModel.appointmentCategory,
        appointment_activity_sub_id:appointmentModel.appointmentActivity,
        cancel_reason:""
      });
  
      let request = {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': 'Bearer '+profile.token
        },
        body:requestBody
      };
  
      fetch(Environment.SERVER_API + "/api/clinician/GetClinicianAvailability", request)
        .then((response) => {
          JSON.stringify(response, null, 4)
          return response.json();
        })
        .then(responseJson => {
          setAvailable(responseJson);
          setAvailable(true);
          if(available == false){
            setAvailabilityMessage("Your doctor is not available for this time, Kindly try a different time")
          }

        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const postAppointment = () => {
    if(!Moment(start_date).isValid()){
      alert("date is required")
      return null
    }

    let requestBody = JSON.stringify({
      client_id: profile.id,
      clinician_id: appointmentModel.doctor.id,
      status:0,
      appointment_type:appointmentModel.appointmentType,
      start_date : start_date,
      end_date : end_date,
      created_at : new Date(),
      appointment_service:serviceId,
      appointment_activity_id:appointmentModel.appointmentCategory,
      appointment_activity_sub_id:appointmentModel.appointmentActivity,
      cancel_reason:""

    });

    let request = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      },
      body:requestBody
    };

    fetch(Environment.SERVER_API + "/api/appointment/PostAppointment", request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        appointmentModel.appointmentDate = start_date
        navigation.navigate(NavigationNames.AppointmentPaymentScreen, { appointmentRef: responseJson, amount: amount, appointmentModel : JSON.stringify(appointmentModel) })
      })
      .catch(error => {
        console.error(error);
      });
  }

  const get_clinician_times = () => {
    setLoading(true);
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/Clinician/getlistclinicianavailability?clinician_id="+appointmentModel.doctor.id +"&date="+date, request)
      .then((response) =>{
        console.log(JSON.stringify(response, null, 4));
        return response.json();
      })
      .then(responseJson => {
        setAvailabilityList(responseJson);
        //alert(JSON.stringify(responseJson));
        console.log(JSON.stringify(responseJson));
        setLoading(false);
      })
      .catch(error => {
        alert(error);
        console.error(error);
      });
  }

  useEffect(() => {
    if (profile != null){
      get_clinician_times();
    }
   
  }, [date]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Provider</Text>

<DoctorItemRow item={appointmentModel.doctor} />
{loading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />
                }
                <Text style={styles.titleText}>Select Service</Text>
      <View style={styles.pickerstyle}>

        <Picker
          onValueChange={(itemValue, itemIndex) => getServiceCost(itemValue)} selectedValue={serviceId}
        >
          <Picker.Item label="Select Service" value={0} />
          {doctorServices.map((item, key) => (
            <Picker.Item label={item.name} value={item.id} key={key} />)
          )}

        </Picker>
      </View>
      <View>
        <Text style={styles.titleText}>Your Preferred Appointment Time ?</Text>
        <View style={styles.calendarSection}>
          <Ionicons style={styles.calendarIcon} name="ios-calendar" size={40} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            pointerEvents="none"
            onTouchStart={showDatePicker}
            autoFocus={false}
            value={date}
          />
          <View style={styles.pickerstyle2}>
            <Picker onValueChange={(itemValue) => {checkAvailability(itemValue)}} selectedValue={appointmentTime}>
              <Picker.Item label="Select Time" value="Select Time" />
 {availabilityList != null && 
  availabilityList.map((item, key) => (
    <Picker.Item label={item} value={item} key={key} />
    )
  )
}
            </Picker>
          </View>
        </View>

      </View>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={onChange}
          onCancel={hideDatePicker}
        />
      </View>
      <Button
        title={available ? getString("Your doctor is available") : getString(availabilityMessage)}
        type="outline"
        style={styles.buttonStyle}
      />



      {
        (available && amount > 0) &&
        <View>
          <Text style={styles.titleText}>Service Charge : {amount.toString()+" "+Environment.DEFAULT_CURRENCY} </Text>
          <ButtonPrimary
              title={getString("Book Appointment")}
              type="outline"
              style={{ height: 50, width: "100%", marginTop: 10, marginBottom: 20 }}
              onPress = {postAppointment}
            />
        </View>

      }
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
    width: "50%",
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: Theme.colors.primaryColor,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 20,
  },

  buttonStyle: {
    marginTop: 30,
    alignSelf: 'stretch',
    fontSize: 20,
    height: 50
  },
  input: {
    height: 50,
    width: "auto",
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
    width: "100%",
    marginRight: 10
  },
  calendarIcon: {
    padding: 10,
  },
  timeSection: {
    flex: 1,
    flexDirection: "row"
  },
  paymentTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "red",
    margin: 10
  },
  paymentInput: {
    height: 50,
    width: "100%",
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: Theme.colors.primaryColor,
    borderRadius: 5,
    marginTop: 10,
 
  },
});