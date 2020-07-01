import React, { Component,useState,useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView ,AsyncStorage,ActivityIndicator,TextInput} from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import { Theme } from "../../theme";
import { Environment } from "../../datas";
import { ButtonPrimary } from "../../components/buttons";
import { useLocalization } from "../../localization";
import {MemberItemRow} from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavigationNames from "../../navigations/NavigationNames";

type TProps = {};
export const MemberSearchScreen: React.FC<TProps> = props => {
    const { getString } = useLocalization();
    const navigation = useNavigation();
    const route = useRoute();

    let [search_query, setsearch_query] = useState('');
    const [loading, setLoading] = useState(false);
    const[members,SetMembers]=useState([]);
    const page_request =route.params["page_request"];

    const onMemberPress=(item)=>{
        if (page_request=="prescription"){
            navigation.navigate(NavigationNames.NewPrescriptionScreen, {
                member: JSON.stringify(item),
              });
        }else if (page_request=="referral"){
            navigation.navigate(NavigationNames.NewReferralScreen, {
                member: JSON.stringify(item),
              });
        }
    };
    
    const searchHandler = () => {
        setLoading(true);
        if (!search_query) {
           
            return;
        }


        fetch(Environment.SERVER_API + '/api/profile/getsearch?query='+search_query, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => {
                // alert(JSON.stringify(response.json()));
                let result = response.json();

                return result;
            })
            .then((responseData) => {
                SetMembers(responseData);
                setLoading(false);

            }).catch(function(error) {
                //alert('There has been a problem with your fetch operation: ' + error.message);
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                  throw error;
                });
    }


    return (<View>
          <TextInput
                    style={styles.input}
                    placeholder="Search members..."
                    onChangeText={search_query => setsearch_query(search_query)}

                />
                 <ButtonPrimary
                    title={getString("Search")}
                    onPress={()=>searchHandler()}
                    type="outline"
                    style={styles.buttonStyle}
                />
                {loading &&
                    <ActivityIndicator size='large' color='#2D9CDB' />}

                <ScrollView style={styles.scrollContainer}>
                {members.map((item,index)=>{
return(
    <TouchableOpacity key={index} onPress={() =>
       onMemberPress(item)}>
        <MemberItemRow item={item}/>
    </TouchableOpacity>

);
                })}
                    
                </ScrollView>
    </View>);
};

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        //backgroundColor: 'gray'
    },
    container: {
        flex: 1,
        //backgroundColor: 'gray',
        alignItems: 'center',
        marginTop: 35
    },
    scrollContainer:{
        marginLeft:10,
        marginRight:10
    },
    input: {
        height: 50,
    
        borderRadius: 10,
        borderColor: Theme.colors.primaryColor,
        borderWidth: 1,
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
        color: "#ffffff"
    },
    buttonStyle: {
        margin: 10,
        alignSelf: 'stretch',
        fontSize: 20,
      
      },
});