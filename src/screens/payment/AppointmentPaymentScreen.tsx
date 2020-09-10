
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';
import { Theme } from "../../theme";
import { ButtonPrimary } from "../../components/buttons";
import { useLocalization } from "../../localization";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";
import { ScrollView} from "react-native-gesture-handler";
import { Environment } from "../../datas/Config";
import { DoctorServicesModel } from "../../models/DoctorServicesModel";
import RNPaystack from 'react-native-paystack';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import NavigationNames from "../../navigations/NavigationNames";
import { ConfirmAppointmentModal } from "../../modals";

type TProps = {};

export const AppointmentPaymentScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const route = useRoute()
  const { getString } = useLocalization();
  const [validDebitCard, setValidDebitCard] = useState(false)
  const [profile, setProfile] = useState(null);
  const [transRef, setTransRef] = useState("");
  const [cardInfo, setCardInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const appointmentRef = route.params["appointmentRef"] as string;
  const amount = route.params["amount"] as number;
  const appointmentModel = JSON.parse(route.params["appointmentModel"]) as NewAppointmentModel;

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

  const postCredit = (transaction_reference : string) => {
    let requestBody = JSON.stringify({
      profile_id: profile.id,
      amount : amount,
      mode_of_payment : 1,
      appointment_id : appointmentRef,
      transaction_reference : transaction_reference,
    });

    let request = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Token': profile.token
      },
      body:requestBody
    };

    fetch(Environment.SERVER_API + "/api/credit/PostCredit", request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
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
    setLoading(true)

      let expiry_info = cardInfo.values.expiry as string;   
      if(appointmentRef.length > 0){
        //todo:: add loader to payment
      RNPaystack.init({ publicKey: Environment.PAYSTACK_PUBLIC_KEY })
        RNPaystack.chargeCard({
          cardNumber: cardInfo.values.number, 
          expiryMonth: expiry_info.substr(0,2), 
          expiryYear: expiry_info.substr(3,2), 
          cvc: cardInfo.values.cvc,
          email: profile.email,
          amountInKobo: amount * 100,
          
        })
      .then(response => {
        if(response.reference != null){
          postCredit(response.reference)
          setPaymentSuccessful(true)
          setTransRef(response.reference)
          setPaymentMessage("Payment Successful")
          setModalVisible(true)
          setLoading(false)
        }
      })
      .catch(error => {
        console.log(error); // error is a javascript Error object
        console.log(error.message);
        console.log(error.code);
      })   
      }
    

  }

  return (
    <ScrollView style={styles.container}>

      {
        (appointmentModel != null && amount > 0) &&
        <View>
            {loading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />
                }
                
          <Text style={styles.titleText}>Service Charge : {amount.toString()+" "+Environment.DEFAULT_CURRENCY} </Text>
          <Text style={styles.paymentTitle}>Please fill in your card details to pay</Text>
          <CreditCardInput onChange={paymentFormHandler} />
          {validDebitCard &&
            <ButtonPrimary
              title={getString("Pay Now")}
              type="outline"
              style={{ height: 50, width: "100%", marginTop: 10, marginBottom: 20 }}
              onPress = {pay}
            />
          }

        </View>

      }

      {/* payment modal */}

      <ConfirmAppointmentModal
      isVisible={modalVisible}
      item = {appointmentModel}
      message = {paymentMessage}
      isSuccess = {paymentSuccessful}
      transRef = {transRef}
      onDismissModal = {() => alert("Click an option instead")}
      onCloseModal = {() => {setModalVisible(false)}}
      onReturnHome = {() => {
        setModalVisible(false)
        navigation.navigate(NavigationNames.MemberProfileScreen)}}
      />
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
});