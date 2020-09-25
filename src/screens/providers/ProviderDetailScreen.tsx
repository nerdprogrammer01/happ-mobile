import React, { useEffect, useCallback, useState, useDebugValue } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import numeral from "numeral";
//import {DoctorReviewItemRow} from "../../components/doctors/DoctorItemRow"
import { DoctorModel } from "../../models";
import { Avatar, Divider, Button } from "../../components";
import { Theme } from "../../theme";
import { AirbnbRating, Rating } from "react-native-ratings";
import { DoctorReviewItemRow } from "../../components/reviews";
import { Ionicons } from "@expo/vector-icons";
import { AppointmentModel} from "../../models";
import { NavigationNames } from "../../navigations";
import {Environment} from "../../datas";
  import { RatingReviewModal } from "../../modals/RatingReviewModal"
type TProps = {};

export const ProviderDetailScreen: React.FC<TProps> = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [stars, setStars] = useState(0);
   
  //const appointment =JSON.parse(route.params["appointment"]) as AppointmentModel;
  //const Appointment = JSON.parse(route.params["Appointment"]) as AppointmentModel;
  const doctor = JSON.parse(route.params["doctor"]) as DoctorModel;
 //console.log(Appointment)
  const [toolbarTitleHided, setToolbarTitleHided] = useState(true);
  var clinician_id = doctor.id ;
  // var Appointment_id = appointment.id ;
  //console.log("Appoinment  iD: "+Appointment_id);
  console.log("clin"+clinician_id);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
   
    const y = event.nativeEvent.contentOffset.y;
    if (toolbarTitleHided && y > 180) {
      setToolbarTitleHided(false);
      navigation.setOptions({ title: doctor?.fullName });
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
    console.log("this is sencond effect");
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

  //console.log("this start "+stars);


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
            uri: doctor?.imageUrl
          }}
          imageStyle={styles.doctorPreviewImage}
        />
        <Text style={styles.doctorInfoFullName}>{doctor?.fullName}</Text>
        <Text style={styles.doctorInfoTitle}>{doctor?.title}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Divider />
        <Text style={styles.aboutText}>{doctor?.about}</Text>
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
        <TouchableOpacity style={styles.rateButtonContainer}   onPress={() => setModalVisible(true)} >
          <Text style={styles.rateButtonTitle}>Rate & Write Message</Text>
          <Ionicons
            name="ios-arrow-forward"
            color={Theme.colors.black}
            size={26}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <Divider />
        <FlatList
          data={doctor?.reviews}
          keyExtractor={(item, index) => `key${index}ForReview`}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          renderItem={row => <DoctorReviewItemRow item={row.item} />}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
        <RatingReviewModal
      isVisible={modalVisible}
      onDismissModal = {() => setModalVisible(false)}
      onCloseModal = {() => {setModalVisible(false)}}
      //appointment_id = {appointment.id}
      />
      </View>
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
