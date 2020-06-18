import React, { useState, useEffect } from "react";
import { View, Text, Picker, StyleSheet, TextInput, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "../../localization";
import { Theme } from "../../theme";

type TProps = {};

export const RegisterScreen: React.FC<TProps> = props => {
    const navigation = useNavigation();
    const { getString, changeLanguage } = useLocalization();
    const baseUrl = 'http://192.168.43.66/mhealth/api/users/get-all-reg-dropdowns';
    const [signUpType, setSignUpType] = useState("provider");
    const [loading, setLoading] = useState(true);

    //const [dropdownData, setData] = useState({ provider_type: [], appointment_types: [] });
    const [dropdownData, setData] = useState();
    let dd = {};
    let yy = [];
    let appointment_types = [];

    useEffect(() => {
        const fetcher = fetch(baseUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            let result = response.json();
            return result;
        }).then((responseData) => {
            //console.log("Convert\n" + JSON.stringify(responseData));
            dd = responseData;
            setData(responseData);
            //console.log(dd);
            dd["appointment_types"].map((u) => {
                appointment_types.push({ id: u.id, value: u.name });
                yy.push(<Picker.Item label={u.name} value={u.id} key={u.id} />)
            });

            //console.log(appointment_types);
            //console.log(dropdownData.provider_type);
            //console.log(yy);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, [])
    //setLoading(false);

    if (loading) {
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                {/* <NavigationBar title="Title" /> */}
                <ActivityIndicator size='large' color='#6646ee' />
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.logo}>
                    <Image source={require('../../../assets/logo.png')} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
                </View>
                <Text style={styles.titleText}>Register as ..</Text>
                <View style={styles.pickerstyle}>
                    <Picker selectedValue={signUpType} onValueChange={(itemValue, itemIndex) => setSignUpType(itemValue)} mode="dropdown">
                        <Picker.Item label="Provider" value="provider" />
                        <Picker.Item label="Member" value="member" />
                    </Picker>
                </View>
                {signUpType === "provider" &&
                    <View>
                        <Text style={styles.titleText}>Are you registering as an individual provider, hospital or a clinic?</Text>
                        <View style={styles.pickerstyle}>
                            <Picker selectedValue={""} mode="dropdown" onValueChange={(itemValue, itemIndex) => setSignUpType(itemValue)}>
                                {appointment_types.map((item, i) =>
                                    <Picker.Item label={item.value} value={item.id} key={i} />
                                )}
                                {appointment_types.map(item => <Picker.Item label={item.value} value={item.id} key={item.id} />)}
                                {/* <Picker.Item label="Individual" value="individual" />
                            <Picker.Item label="Clinic" value="clinic" /> */}
                                {yy.forEach(el => el)}
                            </Picker>
                        </View>
                        <Text style={styles.titleText}>What type of service will you be providing?</Text>
                        <View style={styles.pickerstyle}>
                            <Picker selectedValue={""} mode="dropdown">
                                <Picker.Item label="Behavioural Testing" value="bt" />
                            </Picker>
                        </View>
                    </View>
                }
                {signUpType === "member" &&

                    <View>
                        <Text style={styles.titleText}>What type of appointment are you setting up?</Text>
                        <View style={styles.pickerstyle}>
                            <Picker selectedValue={""} mode="dropdown">

                            </Picker>
                        </View>
                        <Text style={styles.titleText}>What is the category of the appointment?</Text>
                        <View style={styles.pickerstyle}>
                            <Picker selectedValue={""} mode="dropdown">
                                <Picker.Item label="Behavioural Testing" value="bt" />
                            </Picker>
                        </View>
                        <Text style={styles.titleText}>Please specify the activity for the appointment</Text>
                        <View style={styles.pickerstyle}>
                            <Picker selectedValue={""} mode="dropdown">
                                <Picker.Item label="Behavioural Testing" value="bt" />
                            </Picker>
                        </View>
                    </View>
                }
                <View style={styles.btn_container}>
                    <TouchableOpacity style={styles.btn} >
                        <Text style={{ color: "white" }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 24 },
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
    titleText: {
        fontSize: 17,
        fontWeight: "600",
        color: Theme.colors.black,
        paddingTop: 20
    },
    pickerstyle: {
        height: 50,
        //alignSelf: 'stretch',
        borderWidth: 2,
        borderColor: Theme.colors.primaryColor,
        borderRadius: 5,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10
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
        color: "#ffffff"
    },
    btn_container: {
        alignItems: 'center'
    }
});