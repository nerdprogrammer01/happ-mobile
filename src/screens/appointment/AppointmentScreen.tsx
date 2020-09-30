import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,AsyncStorage,FlatList
} from "react-native";
import { useNavigation ,useRoute} from "@react-navigation/native";
import {
    Avatar,
    Button,Divider,
    ButtonPrimary,TouchableHighlight
} from "../../components";
import { AppointmentModel} from "../../models";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { Theme } from "../../theme";
import { HeaderButtons } from "react-navigation-header-buttons";
import {Environment} from "../../datas";
import { CancelAppointmentModal } from "../../modals/CancelAppointmentModal";
import { Ionicons } from "@expo/vector-icons";



const getForms = (getString: (key: string) => string) => [
  {
    title: getString("Family Intake form"),
    navigateToScreen: NavigationNames.FamilyIntakeScreen,
    forward:true
  },
  {
    title: getString("Progress Note"),
    navigateToScreen: NavigationNames.ProgressNoteScreen,
    forward:true
  },
  {
    title: getString("Mental Health Plan"),
    //navigateToScreen: NavigationNames.HMOScreen,
    forward:true
  },
  {
    title: getString("Prescriptions"),
     //navigateToScreen: NavigationNames.PrescriptionsScreen,
    forward:true
  },
  {
    title: getString(" Psychosocial form"),
    //navigateToScreen: NavigationNames.ReferralsScreen,
    forward:true
  },
  {
    title: getString("Psychiatrist Evaluation"),
    //navigateToScreen: NavigationNames.SettingsScreen,
    forward:true
  }
  ,
  {
    title: getString("Psychiatrist Progress Note"),
    navigateToScreen: NavigationNames.PsychiatricProgressScreen,
    forward:true
  }
  ,
  {
    title: getString("Pediatric Evaluation"),
    navigateToScreen: NavigationNames.PediatricEvaluationScreen,
    forward:true
  }
  ,
  {
    title: getString("Primary Care"),
    navigateToScreen: NavigationNames.PrimaryCareScreen,
    forward:true
  }
];


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
  const [formItems,setFormItems]=useState([]);
  



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
     getSessionToken();
     setFormItems(getForms(getString));
   }

  }, [profile]);


  const onPressMenuItemClick = (item: any) => {
    if (item.navigateToScreen) {
      navigation.navigate(item.navigateToScreen,{appointment_id:appointment.id,profile_id:appointment.member.id});
    }
  };

  const getSessionToken = () => {

    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      }
    };
    //console.log("Bearer"+profile.token)
  // console.log(Environment.SERVER_API + "/api/appsession/gettoken?username=" + profile.email + "&appointment_id=" + appointment.id);
    fetch(Environment.SERVER_API + "/api/appsession/gettoken?username=" + profile.email + "&appointment_id=" + appointment.id, request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        //console.log(responseJson.token)
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
            (sessionToken != null && sessionToken != "") && (
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

        {role=="client" && 
        
        <View>
             <Avatar
                imageStyle={styles.imageStyle}
                source={{
                  uri:
                     Environment.SERVER_API+ appointment.doctor.imageUrl
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

        <Text style={styles.formTitleText}>Appointment Forms</Text>

<FlatList
        data={formItems}
        keyExtractor={(item, index) => `key${index}ForMenu`}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => onPressMenuItemClick(item)}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                
              </View>
              <Text style={styles.titleText}>{item.title}</Text>
              {item.forward && 
                <Ionicons
                  name="ios-arrow-forward"
                  size={24}
                  color={Theme.colors.gray}
                />
             }
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />

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
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingEnd: 18,
    paddingStart: 0
  },
  iconContainer: {
    width: 20,
    alignSelf: "center"
  },
  icon: { alignSelf: "center" },
  titleText: {
    flex: 1,
    alignSelf: "center",
    color: Theme.colors.black,
    fontSize: 17
  },
  formTitleText:{
    fontSize: 22,
    fontWeight: "600",
    marginTop: 16,
    marginLeft:20,
    color: Theme.colors.primaryColor
  }
});
