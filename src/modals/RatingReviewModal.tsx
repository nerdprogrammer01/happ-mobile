import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";
//import LinearGradient from "react-native-linear-gradient";
import StarRating from "react-native-star-rating";
//import { useNavigation } from "@react-navigation/native";
import TextArea from "@freakycoder/react-native-text-area";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DoctorModel,AppointmentModel } from "../../src/models";
type TProps = {
    isVisible: boolean;
    onDismissModal: () => void;
    onCloseModal : () => void;
    appointment_id: string;
    starRating,
    onStarRatingPress
  };
export const RatingReviewModal: React.FC<TProps> = props => {
    const navigation = useNavigation();
    const route = useRoute();
    //const appointment =JSON.parse(route.params["appointment"]) as AppointmentModel;
  const [ starRating, onStarRatingPress ]  = useState("");

  
//   const doctor = JSON.parse(route.params["doctor"]) as DoctorModel;
//  console.log(doctor.id)
//   var clinician_id = doctor.id ;
  const appointment_id = props.appointment_id;
console.log(props.appointment_id);

  return (
    <Modal
    isVisible={props.isVisible}
    swipeDirection={"down"}
   // style={styles.modalView}
    onSwipeComplete={props.onDismissModal}
    onBackdropPress={props.onDismissModal}
    >
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 15,

          height: 325,
          width: "90%",
          borderRadius: 5,
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "transparent"
        }}
      >
        <View
          style={{
            height: "100%",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            How was your experience?
          </Text>
          <View style={{ marginRight: 8 }}>
            <StarRating
              maxStars={5}
              starSize={30}
              disabled={false}
              animation="jello"
              rating={starRating}
              fullStarColor="orange"
              emptyStarColor="white"
              starStyle={{ marginLeft: 8 }}
              selectedStar={rating => onStarRatingPress(rating)}
            />
          </View>
          <TextArea
            maxCharLimit={50}
            placeholderTextColor="black"
            exceedCharCountColor="red"
            placeholder={"Write your review..."}
            textAlign={'center'}
            style={{ height: 150, borderRadius: 5 }}
          /> 
          <TouchableOpacity
            style={{
              height: 50,
              width: "95%",
              borderRadius: 5,
              backgroundColor: "white",borderColor:"black",borderWidth:1
            }}
            onPress={() => props.onDismissModal()}
          >
            {/* <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 50,
                width: "100%",
                borderRadius: 16,
                alignContent: "center",
                justifyContent: "center"
              }}
              colors={["#5f2c82", "#49a09d"]}
            >
              <Text
                style={{ color: "white", fontSize: 16, textAlign: "center" }}
              >
                Submit
              </Text>
            </LinearGradient> */}
            <Text style={{marginLeft:"32%",marginTop:"3.2%",fontSize:15}}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

RatingReviewModal.propTypes = {
  stars: PropTypes.number,
  ratings: PropTypes.string
};

RatingReviewModal.defaultProps = {
  stars: 5,
  ratings: "Hellooo"
};

 