import React, { Component,useState,useEffect } from "react";
import { useNavigation ,useRoute} from "@react-navigation/native";
import { View, Text, ScrollView, StyleSheet, Platform ,AsyncStorage,ActivityIndicator,Picker,TextInput} from "react-native";
import { styles } from "../../styles";
import { ButtonPrimary } from "../../components/buttons";
import { Divider,Avatar } from "../../components";
import { useLocalization } from "../../localization";
import {Environment} from "../../datas";
import { Theme } from "../../theme";
import { HeaderButtons} from "react-navigation-header-buttons";


type TProps = {};

export const SettingsScreen: React.FC<TProps> = props => {
    const { getString } = useLocalization();
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword,setOldPassword]=useState("");
    const [isLoading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const [confirmPassword,setConfirmPassword]=useState('');

   
      const changePassword = () => {
        setLoading(true);
        setSuccess(false);
        setError(false);

        if (newPassword != confirmPassword){
          alert("The password does not match");

          return;
        }
       // alert(JSON.stringify(serviceCosts));
      
        let bd = JSON.stringify({
            Username: profile.email,
            OldPassword:oldPassword,
            NewPassword:newPassword
        });
    
   
    
        fetch(Environment.SERVER_API + '/api/settings/changepassword', {
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
                 setConfirmPassword("");
                 setNewPassword('');
                 setOldPassword('');
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
    
    



 

    return (
    <View style={{marginTop:5}}>



        
          {isLoading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />}
    <ScrollView style={[styles.scrollContainer,{marginBottom:30}]}>

    <Text style={styles.titleText}>Update your profile picture</Text>

    {profile != null &&
    
    <Avatar
                imageStyle={styles.imageStyle}
                source={{
                  uri:
                    Environment.SERVER_API+profile.imageUrl
                }}
              />
    }


<ButtonPrimary
                    title={getString("Choose picture")}
                   onPress={()=>{}}
                    type="outline"
                    style={styles.buttonStyle}
                />
           
    
    <Text style={styles.titleText}>Change your password</Text>
    {error && <Text style={[styles.errorText,{marginTop:-10,margin:10}]}>There was an error updating your password. Please check your connection and try again</Text> }
    {success && <Text style={[styles.successText]}>Your password has been updated successfully.</Text> }
    <View>
              <Text style={styles.label_titleText}>Current password</Text>
              <TextInput style={styles.input}  secureTextEntry={true} value={oldPassword} onChangeText={pwd => setOldPassword(pwd)}/>
            </View>

            <View>
              <Text style={styles.label_titleText}>New password</Text>
              <TextInput style={styles.input} secureTextEntry={true} value={newPassword} onChangeText={pwd => setNewPassword(pwd)}/>
            </View>

            <View>
              <Text style={styles.label_titleText} >Confirm new password</Text>
              <TextInput style={styles.input} secureTextEntry={true} value={confirmPassword} onChangeText={pwd => setConfirmPassword(pwd)}/>
            </View>
     
      
            <ButtonPrimary
                    title={getString("Update Password")}
                   onPress={()=>{changePassword()}}
                    type="outline"
                    style={styles.buttonStyle}
                />
           

         

              </ScrollView>
    </View>);
};