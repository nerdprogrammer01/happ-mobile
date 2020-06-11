import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "../../localization";
import { Theme } from "../../theme";

type TProps = {};

export const RegisterScreen: React.FC<TProps> = props => {
    const navigation = useNavigation();
    const { getString, changeLanguage } = useLocalization();
    const baseUrl = 'http://192.168.43.66/mhealth/api/users/authenticate';

    return (
        <View style={styles.main}>
            <WebView
                source={{
                    uri: 'https://github.com/facebook/react-native'
                }}
                style={{ marginTop: 20 }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        //backgroundColor: 'gray'
    }
});