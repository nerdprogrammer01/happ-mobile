import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DoctorItemRow, Divider } from "../../components";
import NavigationNames from "../../navigations/NavigationNames";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";
import { DoctorModel } from "../../models";
import { Environment } from "../../datas";

type TProps = {};

export const ProvidersListScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [doctorsList, setDoctorsList] = useState([]);

  const GetClinicians = () => {
    let appointment: NewAppointmentModel = {
      appointmentType: null,
      appointmentCategory: null,
      appointmentActivity: null
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    }

    fetch(Environment.SERVER_API + "/api/clinician/GetClinicians", requestOptions)
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        setDoctorsList(data as DoctorModel[])
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  useEffect(() => {
   GetClinicians()
  }, []);

  const nextForm = (doctor : DoctorModel) => {
    navigation.navigate(NavigationNames.ProviderDetailScreen, {doctor: JSON.stringify(doctor)})
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
