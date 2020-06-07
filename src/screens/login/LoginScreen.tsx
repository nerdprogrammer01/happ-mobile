import React from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Image, Alert, Button } from 'react-native';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    onLogin() {
        const { email, password } = this.state;
        fetch('https://localhost:5001/api/users/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: email,
                Password: password
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
            })
            .catch((error) => {
                console.error(error);
            });
        //Alert.alert('Credentials', `${email} + ${password}`);
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.logo}>
                    <Image source={require('../../../assets/logo.png')} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        type='email'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry={true} />
                    <TouchableOpacity style={styles.btn} onPress={this.onLogin.bind(this)} >
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
    }
}

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