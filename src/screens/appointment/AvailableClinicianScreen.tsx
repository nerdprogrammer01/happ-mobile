import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import { doctorsList } from "../../datas";
import { DoctorItemRow, Divider } from "../../components";
import NavigationNames from "../../navigations/NavigationNames";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";


type TProps = {};

export const AvailableClinicianScreen: React.FC<TProps> = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const appointmentModel = JSON.parse(route.params["appointmentModel"]) as NewAppointmentModel;
  return (
    <FlatList
      data={doctorsList}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NavigationNames.ConfirmAppointmentScreen, {
              model: JSON.stringify(item)
            })
          }
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
