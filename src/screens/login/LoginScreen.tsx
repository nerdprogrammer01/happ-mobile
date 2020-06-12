import React, { useState, useEffect } from "react";
import {
    TextInput, View, StyleSheet, Text, TouchableOpacity, Image, Alert, Button,AsyncStorage,ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DashboardItemsModel } from "../../models";
import { DashboardService } from "../../services";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { Theme } from "../../theme";


type TProps = {};

export const LoginScreen: React.FC<TProps> = props => {
    const navigation = useNavigation();
    const { getString, changeLanguage } = useLocalization();
    const [loading, setLoading] = useState(false);


    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const registerHandler = () => {
        navigation.navigate(NavigationNames.RegisterScreen);
    }

    const loginHandler = () => {
        setLoading(true);
       //alert(email);
       //alert(password);
        if (!email) {
            alert('Please fill Email');
            setLoading(false);
            return;
          }
          if (!password) {
            alert('Please fill Password');
            setLoading(false);
            return;
          }

        let bd=JSON.stringify({
            Email: email,
            Password: password
        });
      

        fetch('https://myspace-mytime.com/auth/GenerateToken', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: bd
        })
        .then((response) => {
           // alert(JSON.stringify(response.json()));
           let result= response.json();
          
           return result;
        }) 
        .then((responseData) => { 
            //navigation.navigate("Home");
            alert(JSON.stringify(responseData));
            //console.log("response: " + responseData); 
            //check the response, if the user is authenticated, save the data and navigate the user to another screen
            if (responseData.response==200){
                AsyncStorage.setItem('profile',JSON.stringify(responseData));  
                navigation.navigate("Home");
                

            }else{
                alert("Error logging you in. Please chech your credentials.");
            }
          
        })
        .catch((err) => { 
            //alert(err);
            console.log(err); 
        });
    }

    return (
        <View style={styles.main}>
            <View style={styles.logo}>
                <Image source={require('../../../assets/logo.png')} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    onChangeText={Email => setEmail(Email)}
                   
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    onChangeText={Password => setPassword(Password)}
                    secureTextEntry={true} />
                <TouchableOpacity style={styles.btn} onPress={loginHandler} >
                    <Text style={{color:"white"}}>Login</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', color: 'blue' }} onPress={registerHandler}>Not Registered?</Text>
                {/* <TouchableOpacity onPress={this._onPressButton}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>TouchableOpacity</Text>
                        </View>
                    </TouchableOpacity> */}

{loading &&
                    <ActivityIndicator size='large' color='#6646ee' />
                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        //backgroundColor: 'gray'
    },
    logo: {
        //backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '30%'
    },
    container: {
        flex: 1,
        //backgroundColor: 'gray',
        alignItems: 'center',
        marginTop: 35
    },
    input: {
        height: 50,
        width: '90%',
        borderRadius: 10,
        borderColor: Theme.colors.primaryColor,
        borderWidth: 2,
        padding: 10,
        margin: 10
    },
    btn: {
        width: 170,
        height: 50,
        backgroundColor: Theme.colors.primaryColor,
        textAlign: 'center',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        color:"#ffffff"
    }
});