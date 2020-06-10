import React, { useState, useEffect } from "react";
import {
    TextInput, View, StyleSheet, Text, TouchableOpacity, Image, Alert, Button
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DashboardItemsModel } from "../../models";
import { DashboardService } from "../../services";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";

type TProps = {};

export const LoginScreen: React.FC<TProps> = props => {
    const navigation = useNavigation();
    const { getString, changeLanguage } = useLocalization();
    
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const loginHandler = () => {
        navigation.navigate("Home");
        if (!email) {
            alert('Please fill Email');
            return;
          }
          if (!password) {
            alert('Please fill Password');
            return;
          }
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
                {/* <TouchableOpacity onPress={this._onPressButton}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>TouchableOpacity</Text>
                        </View>
                    </TouchableOpacity> */}
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