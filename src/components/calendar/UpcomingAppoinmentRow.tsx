import React,{useState} from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Theme } from "../../theme";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "../avatar";
import { AppointmentModel } from "../../models/AppointmentModel";
import moment from "moment";
import {Environment} from "../../datas";

type TProps = {
  style?: ViewStyle;
  item: AppointmentModel;
  role:string;
};

export const UpcomingAppoinmentRow: React.FC<TProps> = props => {

  const role = props.role as string;
  let fullName="";
  let imageUrl="";
  if (role=="clinician"){
    fullName=props.item.member.fullName;
    imageUrl=props.item.member.imageUrl;
  } 
  else if (role=="client"){
    fullName=props.item.doctor.fullName;
    imageUrl=props.item.doctor.imageUrl;
  }
  return (

    
    <View style={[styles.container, props.style]}>
    
      <Avatar
        source={{          
           uri: Environment.SERVER_API+ imageUrl
            // uri:
            //          "https://raw.githubusercontent.com/publsoft/publsoft.github.io/master/projects/dentist-demo/assets/images/profile_photo.png"
        }}
        // status={props.item.doctor.isOnline ? "online" : "bussy"}
      />
      <View style={styles.rows}>
        <Text style={styles.titleText}>{props.item.title}</Text>
        <Text style={styles.doctorNameText}>{fullName}</Text>
        <Text style={styles.locationText}>
          {`${moment(props.item.appointmentDate,'YYYYMMDD').fromNow()} - ${
            props.item.service
          }`}
        </Text>
      </View>
      <View style={styles.notification}>
        <Ionicons name="ios-notifications" color="white" size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.grayForBoxBackground,
    padding: 10,
    borderRadius: 12,
    flexDirection: "row"
  },
  rows: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 2
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.black
  },
  doctorNameText: {
    marginTop: 3,
    fontSize: 14,
    color: Theme.colors.gray
  },
  locationText: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.gray
  },
  notification: {
    width: 26,
    height: 26,
    marginTop: 2,
    marginEnd: 2,
    backgroundColor: "#F93C1A",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  }
});
