import React, { Component,useState,useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView ,AsyncStorage,ActivityIndicator,Picker,TextInput} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Divider, TouchableHighlight, DoctorItemRow } from "../../components";
import { Theme } from "../../theme";
import { styles } from "../../styles";
import { useLocalization } from "../../localization";
import {
  UpcomingAppoinmentRow,SectionHeader
} from "../../components";
import { DashboardItemsModel, PersonModel } from "../../models";
import { DashboardService } from "../../services";
import { useNavigation ,useRoute} from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { FabButton, ButtonPrimary,Button } from "../../components/buttons";
import {Environment} from "../../datas";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { TouchableOpacity } from "react-native-gesture-handler";

type TProps = {};

export const NewReferralScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [clinician,setClinician]=useState(null);
  const [step,setStep]=useState(1);
  const [clinicians,setClinicians]=useState([]);
  let [search_query, setsearch_query] = useState('');
  const [appointmentType, setAppointmentType] = useState(null);
  const [appointmentCategory, setAppointmentCategory] = useState(null);
  const [appointmentActivity, setAppointmentActivity] = useState(null);
  const [appointment_types, setAppointmentTypes] = useState([]);
  const [appointment_categories, setAppointmentCategories] = useState([]);
  const [appointment_activities, setAppointmentActivities] = useState([]);
  const [error,setError]=useState(false);

  const member =JSON.parse(route.params["member"]);



  const onPressAppointment = () => {
    navigation.navigate(NavigationNames.AppointmentScreen);
  };



  const getAppointmentTypes = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentTypes", request)
      .then((response) => response.json())
      .then(responseJson => {
        setAppointmentTypes(responseJson);
       
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getAppointmentCategories = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentActivities?parent_id="+appointmentType, request)
      .then((response) =>{ 
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        setAppointmentCategories(responseJson);
       
      })
      .catch(error => {
        console.error(error);
      });
  }


  const getAppointmentActivities = (appointment_cateogory_id:number) => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentSubActivities?parent_id="+appointment_cateogory_id, request)
      .then(async response => {
        console.log(JSON.stringify(response, null, 4));
        //alert(response);
        return await response.json();
        
      })
      .then(responseJson => {
        setAppointmentActivities(responseJson);
        setAppointmentCategory(appointment_cateogory_id);
      })
      .catch(error => {
        console.error(error);
       
      });
  }


  const postSearchClinician = () => {
    setLoading(true);
  
    let bd = JSON.stringify({
        name: search_query,
        appointmentType: appointmentType,
        appointmentCategory:appointmentCategory,
        appointmentActivity:appointmentActivity
    });



    fetch(Environment.SERVER_API + '/api/clinician/GetSearchClinicians', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: bd
    })
        .then((response) => {
            alert(JSON.stringify(response, null, 4));

            let result = response.json();

            return result;
        })
        .then((responseData) => {
            //navigation.navigate("Home");
           setClinicians(responseData);
            console.log("response: " + JSON.stringify(responseData)); 
            setLoading(false);
            setStep(2);
            
        }).catch(function(error) {
            alert('There has been a problem with your fetch operation: ' + error.message);
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
            });
}


const postReferral = () => {
  setLoading(true);
  setError(false);
  let profile_match={
    clinician_id: clinician.id,
    profile_id:member.id,
    appointment_type_id:appointmentType,
    appointment_activity_id:appointmentCategory,
    appointment_activity_sub_id:appointmentActivity
  }

  let bd = JSON.stringify({
      clinician_id: clinician.id,
      profile_id:member.id,
      created_by:profile.user_id,
      profile_match:profile_match
  });



  fetch(Environment.SERVER_API + '/api/referral/Post', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: bd
  })
      .then((response) => {
          alert(JSON.stringify(response, null, 4));

          let result = response.json();

          return result;
      })
      .then((responseData) => {
         
          console.log("response: " + JSON.stringify(responseData)); 
          setLoading(false);
          setStep(4);
          
      }).catch(function(error) {
         setError(true);
          console.log('There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
           setLoading(false);
            throw error;
          });
}


/* useEffect(() => {
  getAppointmentTypes();
 }, []);
 */
 useEffect(() => {
   if (appointmentType > 0 && appointmentType != null){
     getAppointmentCategories();
   }
   
  }, [appointmentType]);

  

  useEffect(() => {
    async function load_profile() {
      let profile = await AsyncStorage.getItem('profile')
      .then((data) => {
        setProfile(JSON.parse(data));
       
    })
    .catch((err) => {
       console.log(err);
    });   
    }
   load_profile();
  }, []);


  useEffect(() => {
    if (profile != null){
      getAppointmentTypes();
    }
  
  
  }, [profile]);



  if (profile === null) {
    return <Text>Loading</Text>;
  }

/*   if (step==2){
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
        
         <Button
          title={getString("Submit")}
          onPress={()=>{postPrescription()}}
        />
        </HeaderButtons>
      )
    });
  } */

  return (

            <SafeAreaView style={styles.flex1}>

            {(step == 2 || step==3) && 
            
            <View style={styles.scrollContainer}>
              

<ButtonPrimary
                    title={getString("Back")}
                   onPress={()=>{setStep(step-1)}}
                    type="outline"
                    style={styles.buttonStyle}
                />
              </View>
            }

            {step==1 &&
              <View style={styles.scrollContainer}>

<Text style={styles.label_titleText}>Search provider</Text>
<TextInput
                    style={styles.input}
                    placeholder="Search providers..."
                    onChangeText={search_query => setsearch_query(search_query)}

                />
                 <Text style={styles.label_titleText}>Select appointment type</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setAppointmentType(itemValue)} selectedValue={appointmentType}
        >
          <Picker.Item value={null} label="Select"></Picker.Item>
          { appointment_types.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        </Picker>
      </View>
      <Text style={styles.label_titleText}>Select appointment category</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => getAppointmentActivities(itemValue)} selectedValue={appointmentCategory}
        >
          <Picker.Item value={null} label="Select"></Picker.Item>
           { appointment_categories.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        
        </Picker>
      </View>
      <Text style={styles.label_titleText}>Select appointment activity</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setAppointmentActivity(itemValue)} selectedValue={appointmentActivity}
        >
         <Picker.Item value={null} label="Select"></Picker.Item>
           { appointment_activities.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        
        </Picker>
      </View>
      <ButtonPrimary
        title={getString("Search Providers")}
       onPress={()=>postSearchClinician()}
        type="outline"
        style={styles.buttonStyle}
      />
              </View>
            }
              
              {(clinicians.length > 0 && step==2) &&
                   <ScrollView
                   style={styles.flex1}
                   contentContainerStyle={styles.scrollContainer}
                 >
                   
               {clinicians.map((item,index)=>{
                 return (   
                   <TouchableOpacity key={index} onPress={()=>{setClinician(item); setStep(3);}}>
                      <DoctorItemRow item={item}/>
                          
                          <Divider style={styles.divider} />
                   </TouchableOpacity>
                   );
               })}
                  
                 
                 </ScrollView>


              }

              {step==3 &&

              <View  style={styles.scrollContainer}>
                 <DoctorItemRow item={clinician}/>

                 <Text style={styles.label_titleText}>Select appointment type</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setAppointmentType(itemValue)} selectedValue={appointmentType}
        >
          <Picker.Item value={null} label="Select"></Picker.Item>
          { appointment_types.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        </Picker>
      </View>
      <Text style={styles.label_titleText}>Select appointment category</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => getAppointmentActivities(itemValue)} selectedValue={appointmentCategory}
        >
         
           { appointment_categories.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        
        </Picker>
      </View>
      <Text style={styles.label_titleText}>Select appointment activity</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setAppointmentActivity(itemValue)} selectedValue={appointmentActivity}
        >
        
           { appointment_activities.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        
        </Picker>
      </View>

      {error && <Text style={styles.errorText}>There was an error posting your prescription</Text> }
                
                {isLoading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />
                }

      <ButtonPrimary
        title={getString("Refer Member")}
       onPress={()=>postReferral()}
        type="outline"
        style={styles.buttonStyle}
      />

              </View>

              }

{step==4 && 
              <View  style={styles.scrollContainer}>
              <Text style={styles.titleText}>You have successfully referred the member to the provider</Text>
              <Button
                      title={getString("Go back to Referrals")}
                      onPress={()=>{navigation.navigate(NavigationNames.ReferralsScreen)}}
                    />
            </View>
              }


          </SafeAreaView>


  );
};

