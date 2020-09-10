import React, { Component,useState,useEffect } from "react";
import { useNavigation ,useRoute} from "@react-navigation/native";
import { View, Text, ScrollView, StyleSheet, Platform ,AsyncStorage,ActivityIndicator,Picker,TextInput} from "react-native";
import { styles } from "../../styles";
import { Button } from "../../components/buttons";
import { useLocalization } from "../../localization";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import {Environment} from "../../datas";
import { Theme } from "../../theme";
import { HeaderButtons} from "react-navigation-header-buttons";

type TProps = {};

export const ProviderAvailabilityScreen: React.FC<TProps> = props => {
    const { getString } = useLocalization();
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [item_selected,setItemSelected]=useState("");
    const [isLoading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);

    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 

    var dictionary={};
 /*    dictionary["Start_Sunday"]="";
    dictionary["Start_Monday"]="";
    dictionary["Start_Tuesday"]="";
    dictionary["Start_Wednesday"]="";
    dictionary["Start_Thursday"]="";
    dictionary["Start_Friday"]="";
    dictionary["Start_Saturday"]="";

    dictionary["End_Sunday"]="";
    dictionary["End_Monday"]="";
    dictionary["End_Tuesday"]="";
    dictionary["End_Wednesday"]="";
    dictionary["End_Thursday"]="";
    dictionary["End_Friday"]="";
    dictionary["End_Saturday"]=""; */

    const [dates,setDates]=useState(dictionary);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        dictionary=dates;
        dictionary[item_selected]=moment(selectedDate, ).format("hh:mm A");
        setDates(dictionary);

        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        
        setShow(false);
      };



      const get_availability = () => {
        let request = {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            'Token': profile.token
          }
        };
    
        fetch(Environment.SERVER_API+"/api/clinician/getclinicianavailability?clinician_id="+profile.id, request)
          .then((response) => response.json())
          .then(responseJson => {
            setDates(responseJson);
            setLoading(false);
          })
          .catch(error => {
            alert(error);
            console.error(error);
          });
      }

      const postAvailability = () => {
        setLoading(true);
        setSuccess(false);
        setError(false);
      
        let bd = JSON.stringify({
            clinician_id: profile.id,
            availability:dates
        });
    
    
    
        fetch(Environment.SERVER_API + '/api/clinician/PostClinicianAvailability', {
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
                get_availability();
                //alert('There has been a problem with your fetch operation: ' + error.message);
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
            get_availability();
            //alert(JSON.stringify(dictionary));
        }
      
      
      }, [profile]);


      navigation.setOptions({
        headerRight: () => (
          <HeaderButtons>
           {/*  <Item title={getString("Cancel")}  /> */}
           <Button
            onPress={() => postAvailability()}
            title={getString("Update")}
           
          />
          </HeaderButtons>
        )
      });

    return (
    <View style={{marginTop:15}}>
          
          {isLoading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />}
    <ScrollView style={styles.scrollContainer}>
    {error && <Text style={styles.errorText}>There was an error updating your availability. Please check your connection and try again</Text> }
    {success && <Text style={styles.successText}>Good job. Your availability has been updated successfully.</Text> }
        {days.map((item,index)=>{
            return(
                <View>
                <Text>{item}</Text>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <TextInput placeholder="start date" style={styles.input_left} value={  dates["Start_"+item]}  onFocus={()=>{setShow(true); setItemSelected("Start_"+item);}} />
                    </View>
                    <View style={{flex:1}}>
                        <TextInput placeholder="end date" style={styles.input_right} value={dates["End_"+item]}  onFocus={()=>{setShow(true); setItemSelected("End_"+item);}} />
                    </View>
                </View>
            </View>
            );
        })}
       {show && 
            <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
        />
       }
     {/*   <ButtonPrimary
                    title={getString("Update")}
                   onPress={()=>postAvailability()}
                    type="outline"
                    style={[styles.buttonStyle,{marginRight:10}]}
                /> */}
              </ScrollView>
    </View>);
};