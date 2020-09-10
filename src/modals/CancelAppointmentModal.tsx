import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { useLocalization } from "../localization";
import { Theme } from "../theme";
import { Button } from "../components/buttons/Button";
import { Divider } from "../components/divider";
import { AppointmentTimeModal } from "../models";
import moment from "moment";
import { NewAppointmentModel } from "../models/NewAppointmentModel";
import { useNavigation } from "@react-navigation/native";
import { NavigationNames } from "../navigations";
import { TextInput } from "react-native-gesture-handler";
import { Environment } from "../datas";

type TProps = {
  appointment_id: string;
  isVisible: boolean;
  onDismissModal: () => void;
  onCloseModal : () => void;
};

export const CancelAppointmentModal: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [cancelReason, setcancelReason] = useState("");

  if (props.appointment_id === null) {
    return null;
  }

  const postCancelAppointment = () => {
    if(cancelReason === ""){
      alert("Please let us know why");
      return null
    }

    let requestBody = JSON.stringify({
      appointment_id: props.appointment_id,
      cancel_reason: cancelReason,

    });

    let request = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      },
      body:requestBody
    };

    fetch(Environment.SERVER_API + "/api/appointment/CancelAppointment", request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        if(responseJson == 200){
          navigation.navigate(NavigationNames.CalendarScreen)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }




  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      swipeDirection={"down"}
      style={styles.modalView}
      onSwipeComplete={props.onDismissModal}
      onBackdropPress={props.onDismissModal}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
        <Text style={styles.headerText}>
            Cancel Appointment
          </Text>
          <Divider style={{marginBottom:10}} />

          <TextInput
          placeholder= "Tell us Why are you cancelling ?" 
          onChangeText={reason => setcancelReason(reason)}
          
          />
         
          <Button
            title={getString("SUBMIT")}
            type="outline"
            style={{ marginTop: 8 }}
            onPress = {postCancelAppointment}
          
          />

          <Button
            title={getString("DISMISS")}
            type="outline"
            style={{ marginTop: 8 }}
            onPress={
              props.onCloseModal}
          />
        </View>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "white",
    borderTopStartRadius: 24,
    borderTopEndRadius: 24
  },
  flex1: { flex: 1 },
  modalView: {
    justifyContent: "flex-end",
    margin: 0
  },
  container: {
    padding: 24,
    paddingBottom: 4
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.black
  },
  headerText:{
    fontSize: 18,
    fontWeight: "bold",
    textAlign : "center",
    color:  Theme.colors.black,
    marginBottom:20

  },
  doctorContainer: { paddingVertical: 16 },
  doctorName: {
    fontSize: 15,
    fontWeight: "600",
    color: Theme.colors.black,
    marginTop: 4
  },
  doctorTitle: {
    fontSize: 13,
    color: Theme.colors.gray,
    fontWeight: "600",
    marginTop: 2
  },
  dateText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
    color: Theme.colors.black
  }
});
