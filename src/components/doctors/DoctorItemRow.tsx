import React, { useRef, useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { DoctorModel } from "../../models";
import { Avatar } from "../avatar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Theme } from "../../theme";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import { DoctorDetailsBottomSheet } from "../../modals";
import {Environment} from "../../datas";
import { NavigationNames } from "../../navigations";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";


type TProps = {
  item: DoctorModel;
  style?: ViewStyle;
};

export const DoctorItemRow: React.FC<TProps> = props => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [stars, setStars] = useState(0);

    var clinician_id = props.item.id;
//  console.log("this is: "+clinician_id);

  
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
    <>
      <View style={[styles.container, props.style]}>
        <Avatar
          status={props.item.isOnline ? "online" : null}
          source={{
            uri: Environment.SERVER_API+ props.item.imageUrl
          }}
          style={styles.avatar}
        />
        <View style={styles.textContent}>
          <Text style={styles.doctorNameText}>{props.item.fullName}</Text>
          <Text style={styles.doctorTitleText}>{props.item.title}</Text>
          <View style={{ alignSelf: "flex-start", marginTop: 2 }}>
            <AirbnbRating
              showRating={false}
              count={5}
              size={17}
              isDisabled
              selectedColor={"blue"}
              defaultRating={stars}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setVisibleModal(true)}
        >
          <Ionicons
            size={24}
            name="md-more"
            color={Theme.colors.grayForItemsMore}
          />
        </TouchableOpacity>
      </View>
      <DoctorDetailsBottomSheet
        doctor={props.item}
        isVisible={visibleModal}
        onDismissModal={() => setVisibleModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 14
  },
  avatar: { alignSelf: "center" },
  textContent: { flex: 1, paddingHorizontal: 14 },
  doctorNameText: {
    fontSize: 15,
    fontWeight: "600",
    color: Theme.colors.black
  },
  doctorTitleText: {
    marginTop: 4,
    color: Theme.colors.gray,
    fontSize: 13
  },
  moreButton: {
    paddingHorizontal: 16,
    paddingVertical: 2,
    alignSelf: "flex-start"
  }
});
