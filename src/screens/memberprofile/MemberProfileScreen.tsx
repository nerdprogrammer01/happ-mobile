import React, { Component,useState,useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Divider, TouchableHighlight } from "../../components";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization";
import {
  UpcomingAppoinmentRow,SectionHeader
} from "../../components";
import { DashboardItemsModel } from "../../models";
import { DashboardService } from "../../services";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { FabButton, Button } from "../../components/buttons";

type TProps = {};

export const MemberProfileScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();

  const onPressNewAppointment = () => {
    navigation.navigate(NavigationNames.CreateAppointmentScreen);
  };


  return (
    <SafeAreaView style={styles.flex1}>
      <ScrollView
        style={styles.flex1}
        contentContainerStyle={styles.scrollContainer}
      >
        <Avatar
          imageStyle={styles.imageStyle}
          source={{
            uri:
              "https://raw.githubusercontent.com/publsoft/publsoft.github.io/master/projects/dentist-demo/assets/images/profile_photo.png"
          }}
        />
        <Text style={styles.nameText}>Büşra Mutlu</Text>
        <Text  style={styles.daysText}>00000003</Text>

        <Text style={styles.titleText}>WHAT DO YOU WANT TO DO TODAY?</Text>
    

        <View style={{ marginTop: 14 }}>
          {[
            {
              title: getString("Behavioral"),
              subtitle: "13. days",
              iconName: "md-calendar",
              iconColor: Theme.colors.primaryColor
            },
            {
              title: getString("Medical"),
              subtitle: getString("Appointments"),
              iconName: "md-calendar",
              iconColor: Theme.colors.primaryColor
            },
            {
              title: getString("Diagnostics"),
              subtitle: getString("Programs"),
              iconName: "md-calendar",
              iconColor: Theme.colors.primaryColor
            },
           /*  {
              title: getString("Notifications"),
              subtitle: getString("Show All Notifications"),
              iconName: "md-notifications",
              iconColor: "#F2994A"
            },
            {
              title: getString("Favorite Videos"),
              subtitle: getString("Saved Videos"),
              iconName: "ios-heart",
              iconColor: "#EB5757"
            } */
          ].map((item, index) => {
            return (
              <TouchableHighlight key={index} onPress={onPressNewAppointment}>
                <View>
                  <View style={styles.menuRowContent} >
                    <View style={styles.iconContent}>
                   {/*    <Ionicons
                        name={item.iconName}
                        size={26}
                        color={item.iconColor}
                        style={{ alignSelf: "center" }}
                      /> */}
                    </View>
                    <View style={styles.menuRowsContent}>

                      <Text  style={styles.menuRowTitle}>{item.title}</Text>
                      <Ionicons
                        name={item.iconName}
                        size={16}
                        color={item.iconColor}
                        style={{ alignSelf: "center" }}
                      />
                      <Text style={styles.menuRowSubtitle}>
                       Schedule Appointment
                      </Text>
                     
                    </View>
                   {/*  <Ionicons
                      name="ios-arrow-forward"
                      size={24}
                      color={Theme.colors.primaryColor}
                      style={{ alignSelf: "center" }}
                    /> */}
                  </View>
                  {/* <Divider style={styles.divider} /> */}
                </View>
              </TouchableHighlight>
            );
          })}
         
        </View>
      </ScrollView>
      {/* <FabButton onPress={onPressNewAppointment} /> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 16 },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: 36
  },
  nameText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 16,
    color: Theme.colors.black
  },
  titleText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "400",
    marginTop: 16,
    color: Theme.colors.primaryColor
  },
  daysText: {
    alignSelf: "center",
    fontSize: 14,
    marginTop: 6,
    color: Theme.colors.black
  },
  menuRowContent: {
    flexDirection: "row",
   /*  paddingStart: 12, */
    paddingEnd: 16,
    paddingVertical: 16,
  /*   marginBottom:16,
    marginTop:16, */
    borderWidth:1,
    borderColor:Theme.colors.gray,
    margin:16,
    borderRadius:5
  },
  iconContent: {
    width: 32
  },
  menuRowsContent: { paddingHorizontal: 8, flex: 1 },
  menuRowTitle: {
    fontSize: 25,
    alignSelf: "center",
  },
  menuRowSubtitle: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: "center",
    fontWeight: "800",
    color:Theme.colors.primaryColorDark
  },
  divider: { marginStart: 46 },
  upcomingAppoinmentRow: {
    marginHorizontal: 16
  }
});
