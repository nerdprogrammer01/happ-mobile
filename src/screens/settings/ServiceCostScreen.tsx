import React, { Component,useState,useEffect } from "react";
import { useNavigation ,useRoute} from "@react-navigation/native";
import { View, Text, ScrollView, StyleSheet, Platform ,AsyncStorage,ActivityIndicator,Picker,TextInput} from "react-native";
import { styles } from "../../styles";
import { Button } from "../../components/buttons";
import { Divider } from "../../components";
import { useLocalization } from "../../localization";
import {Environment} from "../../datas";
import { Theme } from "../../theme";
import { HeaderButtons} from "react-navigation-header-buttons";

type TProps = {};

export const ServiceCostScreen: React.FC<TProps> = props => {
    const { getString } = useLocalization();
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [item_selected,setItemSelected]=useState("");
    const [isLoading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const [serviceCosts,setServiceCosts]=useState([]);
 

    var costs=[];
 

    const update_cost=(service_id,sub_id,value)=>{
        costs=serviceCosts;

        costs = costs.filter(function(item){
          if (item.service_id==service_id && item.sub_id==sub_id){
              item.cost=Number(value);
          }
          return item;
       });

       setServiceCosts(costs);
    };
    



      const get_service_costs = () => {
        
        let request = {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            'Token': profile.token
          }
        };
    
        fetch(Environment.SERVER_API+"/api/servicecost/GetClinicianServiceCosts?clinician_id="+profile.id, request)
          .then((response) => response.json())
          .then(responseJson => {
            setServiceCosts(responseJson);
            setLoading(false);
          })
          .catch(error => {
            //alert(error);
            console.error(error);
          });
      }

      const postServiceCosts = () => {
        setLoading(true);
        setSuccess(false);
        setError(false);

       // alert(JSON.stringify(serviceCosts));
      
        let bd = JSON.stringify({
            clinician_id: profile.id,
            created_by:profile.user_id,
            CostingModels:serviceCosts
        });
    
        alert(bd);
    
        fetch(Environment.SERVER_API + '/api/servicecost/Post', {
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
          get_service_costs();
            //alert(JSON.stringify(dictionary));
        }
      
      
      }, [profile]);


      navigation.setOptions({
        headerRight: () => (
          <HeaderButtons>
           {/*  <Item title={getString("Cancel")}  /> */}
           <Button
            onPress={() => postServiceCosts()}
            title={getString("Update")}
           
          />
          </HeaderButtons>
        )
      });

    return (
    <View style={{marginTop:15}}>
          {error && <Text style={[styles.errorText,{marginTop:-10,margin:10}]}>There was an error updating your service costs. Please check your connection and try again</Text> }
    {success && <Text style={[styles.successText,{marginTop:-10,margin:10}]}>Good job. Your service costs has been updated successfully.</Text> }
          {isLoading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />}
    <ScrollView style={[styles.scrollContainer,{marginBottom:30}]}>
    
        {serviceCosts.map((item,index)=>{
            return(
                <View key={index}>
                <Text style={styles.cost_categoryText}>{item.sub_name}</Text>
                <Text style={styles.cost_serviceText}>{item.service_name}</Text>
                <TextInput placeholder="cost" style={styles.input_left} value={  item.cost.toString()} keyboardType={'numeric'}  onChangeText={value => update_cost(item.service_id,item.sub_id,value)} />
                <Divider style={styles.divider} />
              </View>
            );
        })}
      

              </ScrollView>
    </View>);
};