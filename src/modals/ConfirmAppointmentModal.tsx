import React from "react";
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

type TProps = {
  item?: NewAppointmentModel;
  isVisible: boolean;
  selectedDate?: Date;
  onDismissModal: () => void;
  onCloseModal : () => void;
  onReturnHome : () => void;
  message?: string;
  isSuccess?: boolean;
};

export const ConfirmAppointmentModal: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();


  if (props.item === null) {
    return null;
  }

  const headStyle = (is_success : boolean)  => {
    return  {
        fontSize: 18,
        fontWeight: "bold",
        textAlign : "center",
        color:  is_success ? Theme.colors.primaryColor : Theme.colors.danger,
        marginBottom:20
      }
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
        <Text style={headStyle(props.isSuccess)}>
            {props.message}
          </Text>
          <Divider style={{marginBottom:10}} />
          <Text style={styles.titleText}>
            {getString("Appoinment Details")}
          </Text>
          <View style={styles.doctorContainer}>
            <Text style={{ color: Theme.colors.gray }}>
              {getString("Doctor")}
            </Text>
            <Text style={styles.doctorName}>{props.item.doctor.fullName}</Text>
            <Text style={styles.doctorTitle}>{props.item.doctor.title}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.dateText}>
              {moment(props.item.appointmentDate).format('LLL')}
            </Text>
          </View>
          {
          !props.isSuccess && (
            <Button title={getString("TRY AGAIN")} onPress={props.onCloseModal} />            
            )
          }
          <Button
            title={getString("RETURN TO HOME")}
            type="outline"
            style={{ marginTop: 8 }}
            onPress={
              props.onReturnHome}
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
  timeContainer: {
    paddingVertical: 36,
    marginBottom: 12,
    alignItems: "center"
  },
  timeText: {
    fontSize: 62,
    fontWeight: "200",
    color: Theme.colors.black,
    marginTop: 4
  },
  dateText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
    color: Theme.colors.black
  }
});
