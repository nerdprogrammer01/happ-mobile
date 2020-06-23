import React, { useState, useEffect } from "react";
import { View, Text, Picker, StyleSheet, TextInput, AsyncStorage } from 'react-native';
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
import { Times } from "../../datas/Times";
import RNPaystack from 'react-native-paystack';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

type TProps = {};

export const ConfirmAppointmentScreen: React.FC<TProps> = props => {
  const [serviceId, setServiceId] = useState("");
  const navigation = useNavigation();
  const route = useRoute()
  const { getString } = useLocalization();
  const [doctorServices, setDoctorServices] = useState([] as DoctorServicesModel[]);
  const [amount, setAmount] = useState(0.00);
  const [available, setAvailable] = useState(false)
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [validDebitCard, setValidDebitCard] = useState(false)
  const [servicePeriod, setServicePeriod] = useState(0)
  const [start_date, setStart_date] = useState(null)
  const [end_date, setEnd_date] = useState(null)
  const [profile, setProfile] = useState(null);
  const [transRef, setTransRef] = useState("");
  const [cardInfo, setCardInfo] = useState(null);

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
//      setAppointmentDate(date)
      hideDatePicker();
    };


  let appointmentModel = JSON.parse(route.params["appointmentModel"]) as NewAppointmentModel;

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
  

  const getClinicianServices = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API + "/api/clinician/GetClinicianServices?clinician_id=" + appointmentModel.doctor.id, request)
      .then((response) => {
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

  const getServiceCost = (service_id: string) => {

    setServiceId(service_id)

    doctorServices.filter(function(service) {
      if(service.id == service_id){      
        return setServicePeriod(service.time_minutes)
      } 
    })

    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API + "/api/servicecost/GetClinicianServiceCost?service_id=" + service_id + "&clinician_id=" + appointmentModel.doctor.id, request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        setAmount(responseJson.cost)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const checkAvailability = (timeString : string) => {
    setAppointmentTime(timeString);
    setAvailable(!available)

    if(date != null && servicePeriod > 0){
      var start_date = Moment(date.trim()+" "+appointmentTime.trim()+":00", 'DD-MM-YYYY hh:mm:ss').format('DD-MM-YYYY hh:mm:ss')
      var end_date = Moment(start_date,'DD-MM-YYYY hh:mm').add(servicePeriod, 'minutes').format('DD-MM-YYYY hh:mm:ss');
      
      setStart_date(start_date)
      setEnd_date(end_date)
    }
  }

  const postAppointment = () => {
    let requestBody = JSON.stringify({
      client_id: profile.id,
      clinician_id: appointmentModel.doctor.id,
      status:0,
      appointment_type:appointmentModel.appointmentType,
      start_date : start_date,
      end_date : end_date,
      created_at : new Date(),
      appointment_serivice:serviceId,
      appointment_activity_id:appointmentModel.appointmentCategory,
      appointment_activity_sub_id:appointmentModel.appointmentActivity,
      cancel_reason:""

    });

    let request = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      },
      body:requestBody
    };

    fetch(Environment.SERVER_API + "/api/appointment/PostAppointment", request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        setTransRef(responseJson)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const paymentFormHandler = (form) => {
    if (form.valid){
      setValidDebitCard(form.valid)
      setCardInfo(form)
    }

  }

  const pay = () =>
  {
    if(validDebitCard && cardInfo !=null){
      {postAppointment}

      if(transRef.length > 0){
        RNPaystack.init({ publicKey: Environment.PAYSTACK_PUBLIC_KEY })
        RNPaystack.chargeCardWithAccessCode({
          cardNumber: cardInfo.values.number, 
          expiryMonth: cardInfo.values.expiry, 
          expiryYear: cardInfo.values.number, 
          cvc: cardInfo.values.cvc,
          accessCode: transRef,
          
        })
      .then(response => {
        console.log(response); // do stuff with the token
        //confirm payment here
      })
      .catch(error => {
        console.log(error); // error is a javascript Error object
        console.log(error.message);
        console.log(error.code);
      })   
      }
    }
  }

  useEffect(() => {
    getClinicianServices();
  }, []);



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
          {doctorServices.map((item, key) => (
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
            <Picker onValueChange={(itemValue) => checkAvailability(itemValue)}>
              <Picker.Item label="Select Time" value="Select Time" />
              {Times.map((item, key) => (
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
        title={available ? getString("Your doctor is available") : getString("Check Availability")}
        type="outline"
        style={styles.buttonStyle}

      />

      {
        (available && amount > 0) &&
        <View>
          <Text style={styles.titleText}>Service Charge : {amount.toString()+" "+Environment.DEFAULT_CURRENCY} </Text>
          <Text style={styles.titleText}>Please fill in your card details to pay</Text>
          <LiteCreditCardInput onChange={paymentFormHandler} />
          {validDebitCard &&
            <Button
              title={getString("Pay Now")}
              type="outline"
              style={{ height: 50, width: "100%", marginTop: 10, marginBottom: 20 }}
              onPress = {pay}
            />
          }

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
});