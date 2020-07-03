import React, { Component,useState,useEffect } from "react";
import { useNavigation ,useRoute} from "@react-navigation/native";
import { View, Text, ScrollView, StyleSheet, Platform ,AsyncStorage,ActivityIndicator,Picker,TextInput} from "react-native";
import { styles } from "../../styles";
import { Button, ButtonPrimary } from "../../components/buttons";
import { Divider } from "../../components";
import { useLocalization } from "../../localization";
import {Environment} from "../../datas";
import { Theme } from "../../theme";
import { HeaderButtons} from "react-navigation-header-buttons";

type TProps = {};

export const BankInfoScreen: React.FC<TProps> = props => {
    const { getString } = useLocalization();
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const [bankInfo,setBankInfo]=useState({});
    const [bankName,setBankName]=useState('');
    const [accountName,setAccountName]=useState('');
    const [accountNumber,setAccountNumber]=useState('');
    
  

      const get_bank_info = () => {
        
        let request = {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            'Token': profile.token
          }
        };
    
        fetch(Environment.SERVER_API+"/api/settings/GetBank?profile_id="+profile.id, request)
          .then((response) => response.json())
          .then(responseJson => {
            setBankInfo(responseJson);
            setLoading(false);
          })
          .catch(error => {
            //alert(error);
            console.error(error);
          });
      }

      const post_bank_info = () => {
        setLoading(true);
        setSuccess(false);
        setError(false);

        if(!bankName){
          alert("Please enter the name of your bank");
          setLoading(false);
        }
  
  
        if(!accountName){
          alert("Please enter the name of your account name");
          setLoading(false);
        }
  
        if(!accountNumber){
          alert("Please enter the name of your account number");
          setLoading(false);
        }
  
        let request = {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer '+profile.token
          }
        };


       // alert(JSON.stringify(serviceCosts));
       bankInfo["bank_name"]=bankName;
       bankInfo["account_name"]=accountName;
       bankInfo["account_number"]=accountNumber;
       bankInfo["created_by"]=profile.user_id;
       bankInfo["updated_by"]=profile.user_id;
       bankInfo["profile_id"]=profile.id;
      
        let bd = JSON.stringify(bankInfo);
    
    
        fetch(Environment.SERVER_API + '/api/settings/PostBank', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+profile.token
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
          get_bank_info();
        }
      
      
      }, [profile]);


      useEffect(() => {
        if (bankInfo != null){
          setAccountName(bankInfo["account_name"]);
          setAccountNumber(bankInfo["account_number"]);
          setBankName(bankInfo["bank_name"]);
        }
      
      
      }, [bankInfo]);


    

    return (
    <View style={{marginTop:15}}>
          {error && <Text style={[styles.errorText,{margin:10}]}>There was an error updating your service costs. Please check your connection and try again</Text> }
    {success && <Text style={[styles.successText,{margin:10}]}>Good job. You have successfully updated your bank information.</Text> }
          {isLoading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />}
    <ScrollView style={[styles.scrollContainer,{marginBottom:30}]}>
            <View>
              <Text style={styles.label_titleText}>Bank name</Text>
              <TextInput style={styles.input} value={bankName} onChangeText={value =>{setBankName(value);}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Account name</Text>
              <TextInput style={styles.input} value={accountName} onChangeText={value =>{setAccountName(value)}}/>
            </View>

            <View>
              <Text style={styles.label_titleText}>Account number</Text>
              <TextInput style={styles.input} value={accountNumber} onChangeText={value =>{setAccountNumber('')}}/>
            </View>
     
      
            <ButtonPrimary
                    title={getString("Update Bank Information")}
                   onPress={()=>{post_bank_info()}}
                    type="outline"
                    style={styles.buttonStyle}
                />
           

              </ScrollView>
    </View>);
};