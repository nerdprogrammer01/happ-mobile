import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { doctorsList } from "../../datas";
import { DoctorItemRow, Divider } from "../../components";
import NavigationNames from "../../navigations/NavigationNames";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";
import { DoctorModel } from "../../models";

type TProps = {};

export const DoctorListScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const route = useRoute();

  let appointmentModel = JSON.parse(route.params["appointmentModel"]) as NewAppointmentModel;
  const doctorsList : DoctorModel[] = JSON.parse(route.params["doctors"]);

  const nextForm = (doctor : DoctorModel) => {
    appointmentModel.doctor = doctor;
    navigation.navigate(NavigationNames.DoctorDetailScreen, {appointmentModel: JSON.stringify(appointmentModel)})
    };

  return (
    <FlatList
      data={doctorsList}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => nextForm(item) }
          style={styles.itemRowContainer}
        >
          <DoctorItemRow item={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => `key${index}ForDoctor`}
      ItemSeparatorComponent={() => <Divider />}
      contentContainerStyle={{ paddingVertical: 12 }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemRowContainer: { paddingStart: 16, paddingEnd: 8 }
});
