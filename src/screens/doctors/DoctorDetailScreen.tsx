import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  AsyncStorage
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import numeral from "numeral";
import { DoctorModel } from "../../models";
import { Avatar, Divider, Button } from "../../components";
import { Theme } from "../../theme";
import { AirbnbRating } from "react-native-ratings";
import { DoctorReviewItemRow } from "../../components/reviews";
import { Ionicons } from "@expo/vector-icons";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";
import { NavigationNames } from "../../navigations";
import {Environment} from "../../datas";

type TProps = {};

export const DoctorDetailScreen: React.FC<TProps> = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const appointmentModel = JSON.parse(route.params["appointmentModel"]) as NewAppointmentModel;
 // const [profile, setProfile] = useState(null);
  const [stars, setStars] = useState(0);

  const nextForm = (doctor : DoctorModel) => {
    appointmentModel.doctor = doctor;
    navigation.navigate(NavigationNames.ConfirmAppointmentScreen, {appointmentModel: JSON.stringify(appointmentModel)})
    };

var clinician_id = appointmentModel.doctor.id;
// console.log("this is: "+clinician_id);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => nextForm(appointmentModel.doctor)} size="small" title="Select" />
      ),
    });
  }, [navigation]);

  const [toolbarTitleHided, setToolbarTitleHided] = useState(true);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
   
    const y = event.nativeEvent.contentOffset.y;
    if (toolbarTitleHided && y > 180) {
      setToolbarTitleHided(false);
      navigation.setOptions({ title: appointmentModel.doctor?.fullName });
    } else if (!toolbarTitleHided && y <= 180) {
      setToolbarTitleHided(true);
      navigation.setOptions({ title: " " });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      }
    });
  }, []);
  
  useEffect(()=>{
    get_Stars();

  })
  

  const get_Stars = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",

      }
    };
  
    fetch(Environment.SERVER_API+"/api/clinician/GetClinicianRatings?clinician_id="+clinician_id, request)
      .then((response) => response.json())
      .then(responseJson => {
        //console.log(responseJson.averageRating)
        setStars(responseJson.averageRating)
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={handleScroll}
    >
      <View style={styles.headerContainer}>
        <Avatar
          source={{
            uri:  Environment.SERVER_API+ appointmentModel.doctor?.imageUrl
          }}
          imageStyle={styles.doctorPreviewImage}
        />
        <Text style={styles.doctorInfoFullName}>{appointmentModel.doctor?.fullName}</Text>
        <Text style={styles.doctorInfoTitle}>{appointmentModel.doctor?.title}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Detail</Text>
        <Divider />
        <Text style={styles.aboutText}>{appointmentModel.doctor?.about}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Rating</Text>
        <Divider />
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingNumberText}>
            {stars}
          </Text>
          <AirbnbRating
            showRating={false}
            count={5}
            size={28}
            isDisabled
            selectedColor={"blue"}
            defaultRating={stars}
          />
        </View>
       {/*  <TouchableOpacity style={styles.rateButtonContainer}>
          <Text style={styles.rateButtonTitle}>Rate & Write Message</Text>
          <Ionicons
            name="ios-arrow-forward"
            color={Theme.colors.black}
            size={26}
          />
        </TouchableOpacity> */}
      </View>

{/*       <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <Divider />
        <FlatList
          data={appointmentModel.doctor?.reviews}
          keyExtractor={(item, index) => `key${index}ForReview`}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          renderItem={row => <DoctorReviewItemRow item={row.item} />}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    paddingVertical: 8
  },
  headerContainer: { paddingHorizontal: 16, alignItems: "center" },
  doctorPreviewImage: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderWidth: 0.5,
    borderColor: Theme.colors.primaryColor
  },
  doctorInfoFullName: {
    fontSize: 19,
    fontWeight: "600",
    color: Theme.colors.black,
    marginTop: 22
  },
  doctorInfoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.gray,
    marginTop: 6
  },
  divider: { marginHorizontal: 0, marginVertical: 12 },
  sectionContainer: { paddingHorizontal: 16, marginTop: 12 },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 15,
    paddingVertical: 8,
    color: Theme.colors.black
  },
  aboutText: {
    paddingVertical: 8,
    color: Theme.colors.black,
    fontSize: 15
  },
  ratingContainer: { flexDirection: "row", paddingVertical: 16 },
  ratingNumberText: {
    alignSelf: "center",
    fontSize: 32,
    fontWeight: "600",
    marginEnd: 12
  },
  rateButtonContainer: {
    paddingVertical: 8,
    flexDirection: "row"
  },
  rateButtonTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    color: Theme.colors.black
  }
});
