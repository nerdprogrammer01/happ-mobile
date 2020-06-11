import React, { useState, useEffect } from "react";
import {
    TextInput, View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";

type TProps = {};

export const LoginScreen: React.FC<TProps> = props => {
    const navigation = useNavigation();
    const { getString, changeLanguage } = useLocalization();
    const baseUrl = 'http://192.168.43.66/mhealth/api/users/authenticate';
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    const loginHandler = () => {
        setLoading(true);
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
        // fetch('/', {
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: {
        //         "email": email,
        //         "password": password
        //     }
        // });
        var data = { Username: email, Password: password };
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success 
                alert(responseJson.message);
                setLoading(false);
                if (responseJson.message === "Success") {
                    setToken(responseJson.token);
                    navigation.navigate("Home");
                }
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error 
                alert(error);
                setLoading(false);
            });
    }

    const registerHandler = () => {
        navigation.navigate(NavigationNames.RegisterScreen);
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
                    <Text>Login</Text>
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
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        margin: 10
    },
    btn: {
        width: 170,
        height: 50,
        backgroundColor: 'lightskyblue',
        textAlign: 'center',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
});