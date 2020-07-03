import React, { Component,useState,useEffect } from "react";
import { useNavigation ,useRoute} from "@react-navigation/native";
import { View, Text, ScrollView, StyleSheet, Platform ,AsyncStorage,ActivityIndicator,Picker,TextInput} from "react-native";
import { styles } from "../../styles";
import { ButtonPrimary } from "../../components/buttons";
import { Divider } from "../../components";
import { useLocalization } from "../../localization";
import {Environment} from "../../datas";
import { Theme } from "../../theme";
import { HeaderButtons} from "react-navigation-header-buttons";

type TProps = {};

export const HMOScreen: React.FC<TProps> = props => {
    const { getString } = useLocalization();
    const navigation = useNavigation();
    const [hmo, setHMO] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [insuranceNumber,setInsuranceNumber]=useState("");
    const [isLoading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const [hmoInfo,setHMOInfo]=useState([]);
 

    
    
    const get_hmo_info = () => {
        
      let request = {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'Token': profile.token
        }
      };
  
      fetch(Environment.SERVER_API+"/api/settings/GetHMO?profile_id="+profile.id, request)
        .then((response) => response.json())
        .then(responseJson => {
          setHMOInfo(responseJson);
          setLoading(false);
        })
        .catch(error => {
          //alert(error);
          console.error(error);
        });
    }


    const post_hmo_info = () => {
      setLoading(true);
      setSuccess(false);
      setError(false);

      if(!hmo){
        alert("Please enter the name of your Health Maintenance Organization");
        setLoading(false);
      }


      if(!organizationName){
        alert("Please enter the name of your organization");
        setLoading(false);
      }

      if(!insuranceNumber){
        alert("Please enter the name of your insurance number");
        setLoading(false);
      }


     // alert(JSON.stringify(serviceCosts));
     hmoInfo["hmo_name"]=hmo;
     hmoInfo["organization_name"]=organizationName;
     hmoInfo["insurance_number"]=insuranceNumber;
     hmoInfo["created_by"]=profile.user_id;
     hmoInfo["updated_by"]=profile.user_id;
     hmoInfo["profile_id"]=profile.id;
    
      let bd = JSON.stringify(hmoInfo);
  
  
      fetch(Environment.SERVER_API + '/api/settings/PostHmo', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: bd
      })
          .then((response) => {
             // alert(JSON.stringify(response, null, 4));
  
              let result = response.json();
  
              return result;
          })
          .then((responseData) => {
       
               setSuccess(true);
               setLoading(false);
              console.log("response: " + JSON.stringify(responseData)); 
              
          }).catch(function(error) {
              setError(true);
              setLoading(false);
            
              console.log('There has been a problem with your fetch operation: ' + error.message);
               // ADD THIS THROW error
                //throw error;
              });
  }
  


     

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
          get_hmo_info();
        }
      
      
      }, [profile]);

      useEffect(() => {
        if (hmoInfo != null){
          setHMO(hmoInfo["hmo_name"]);
          setOrganizationName(hmoInfo["organization_name"]);
          setInsuranceNumber(hmoInfo["insurance_number"]);
        }
      
      
      }, [hmoInfo]);

 

    return (
    <View style={{marginTop:15}}>
          {error && <Text style={[styles.errorText,{marginTop:-10,margin:10}]}>There was an error updating your bank information. Please check your connection and try again</Text> }
    {success && <Text style={[styles.successText,{marginTop:-10,margin:10}]}>Good job. You have successfully updated your bank information.</Text> }
          {isLoading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />}
    <ScrollView style={[styles.scrollContainer,{marginBottom:30}]}>
    
    <View>
              <Text style={styles.label_titleText}>Health Maintenance Organization</Text>
              <TextInput style={styles.input} value={hmo}  onChangeText={value =>{setHMO(value);}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Organization name</Text>
              <TextInput style={styles.input} value={organizationName}  onChangeText={value =>{setOrganizationName(value);}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Insurance number</Text>
              <TextInput style={styles.input} value={insuranceNumber}  onChangeText={value =>{setInsuranceNumber(value);}} />
            </View>
     
      
            <ButtonPrimary
                    title={getString("Update")}
                   onPress={()=>{post_hmo_info()}}
                    type="outline"
                    style={styles.buttonStyle}
                />
           

         

              </ScrollView>
    </View>);
};