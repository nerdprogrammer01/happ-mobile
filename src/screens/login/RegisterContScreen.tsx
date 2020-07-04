import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "../../localization";
import { Theme } from "../../theme";
import NavigationNames from "../../navigations/NavigationNames";
import { Environment } from "../../datas";

type TProps = {};

export const RegisterContScreen: React.FC<TProps> = props => {
    const navigation = useNavigation();
    const { getString, changeLanguage } = useLocalization();
    const baseUrl = Environment.SERVER_WEB + '/user/registerMobile';

    const loginButtonHandler = () => {
        navigation.navigate(NavigationNames.LoginScreen);
    }

    return (
        <View style={styles.main}>
            <WebView
                source={{
                    uri: baseUrl
                }}
                style={{ marginTop: 20 }}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator
                        color='black'
                        size='large'
                        style={styles.flexContainer}
                    />
                )}
                javaScriptEnabled={true}
            />
            <View style={styles.tabBarContainer}>
                <TouchableOpacity onPress={loginButtonHandler}>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
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
    flexContainer: {
        flex: 1
    },
    tabBarContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Theme.colors.primaryColor
    },
    button: {
        color: 'white',
        fontSize: 24
    }
});