import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,AsyncStorage
} from "react-native";
import { useNavigation ,useRoute} from "@react-navigation/native";
import {
    Avatar,
    Button,Divider,
    ButtonPrimary,
} from "../../components";
import { AppointmentModel} from "../../models";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { Theme } from "../../theme";
import { HeaderButtons } from "react-navigation-header-buttons";
import {Environment} from "../../datas";
import { CancelAppointmentModal } from "../../modals/CancelAppointmentModal";

type TProps = {};

export const AppointmentScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getString, changeLanguage } = useLocalization();
  const appointment =JSON.parse(route.params["appointment"]) as AppointmentModel;
  const [profile, setProfile] = useState(null);
  const [role,setRole]=useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  
  useEffect(() => {
    async function load_profile() {
        let profile = await AsyncStorage.getItem('profile'); 
        setProfile(JSON.parse(profile));
      }
     load_profile();

  }, []);

  useEffect(() => {
   if (profile != null){
     setRole(profile.role);
     getSessionToken()
   }

  }, [profile]);



  const getSessionToken = () => {

    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API + "/api/appsession/gettoken?username=" + profile.email + "&appointment_id=" + appointment.id, request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson.token)
        setSessionToken(responseJson.token)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const onPressNewSession = () => {
    navigation.navigate(NavigationNames.VideoConferenceScreen, {session_token : sessionToken});
  };
  
  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons>
       {/*  <Item title={getString("Cancel")}  /> */}
       <Button
        onPress={() => setModalVisible(true)}
        title={getString("Cancel")}
      />
      </HeaderButtons>
    )
  });

  return (
      <View style={styles.maincontainer}>
          <View style={styles.appointmentContainer}>
          <Text style={styles.appointmentText}>{appointment.title}</Text>
  <Text style={styles.appointmentSubText}>{appointment.service}</Text>
           <Text style={styles.appointmentSubText}>Duration : {appointment.duration} mins</Text>
      
          </View>
          {
            sessionToken != null && (
              <ButtonPrimary style={styles.buttontStyle}
              title={getString("START SESSION")}
              type="outline"
              onPress={onPressNewSession}
            />
            )
          }

           <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

        {role=="clieint" && 
        
        <View>
             <Avatar
                imageStyle={styles.imageStyle}
                source={{
                  uri:
                     Environment.SERVER_API+ appointment.doctor.imageUrl
                   // "https://raw.githubusercontent.com/publsoft/publsoft.github.io/master/projects/dentist-demo/assets/images/profile_photo.png"
                }}
              />
              <Text style={styles.nameText}>{appointment.doctor.fullName}</Text>
              <Text  style={styles.daysText}>{appointment.doctor.title}</Text>

              <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>About provider</Text>
        <Divider />
        <Text style={styles.aboutText}>{appointment.doctor.about}</Text>
      </View>
        </View>
        
        }

        
{role=="clinician" && 
        
        <View>
             <Avatar
                imageStyle={styles.imageStyle}
                source={{
                  uri:
                  Environment.SERVER_API+ appointment.member.imageUrl
                    //"https://raw.githubusercontent.com/publsoft/publsoft.github.io/master/projects/dentist-demo/assets/images/profile_photo.png"
                }}
              />
              <Text style={styles.nameText}>{appointment.member.fullName}</Text>
              <Text  style={styles.daysText}>{appointment.member.title}</Text>

              <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>About member</Text>
        <Divider />
            <Text style={styles.aboutText}>{appointment.member.about}</Text>
      </View>
        </View>
        
        }

{/* Cancel Appointment Modal */}
<CancelAppointmentModal
      isVisible={modalVisible}
      onDismissModal = {() => setModalVisible(false)}
      onCloseModal = {() => {setModalVisible(false)}}
      appointment_id = {appointment.id}
      />
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1
      },
  container: { paddingVertical: 24 },
  upcomingAppoinmentRow: {
    marginHorizontal: 16,
    margin:10,
  
  },
  touchableDoctorItem: {
    paddingStart: 16,
    paddingEnd: 8
  },
  campaignsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  departmentsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  horizontalDivider: { width: 12 },
  fabtuttonstyle:{
      borderColor:Theme.colors.primaryColor,
      borderWidth:1
  },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: 10
  },
  nameText: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 16,
    color: Theme.colors.black
  },

  daysText: {
    alignSelf: "center",
    fontSize: 14,
    marginTop: 6,
    color: Theme.colors.black
  },
  buttontStyle:
  {
      marginTop:10,
      marginStart:16,
      marginEnd:16,
      backgroundColor:Theme.colors.primaryColor,
      color:"white"
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
  appointmentContainer:{
    marginTop:10,
    marginStart:16,
    marginEnd:16
  },
  appointmentText: {
    fontSize: 22,
    fontWeight: "600",
    color: Theme.colors.black
  },
  appointmentSubText: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.black
  }
});
