import React, { useState,useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView ,AsyncStorage,ActivityIndicator,Picker,TextInput} from "react-native";
import { Divider} from "../../components";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization";
import { useNavigation ,useRoute} from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { ButtonPrimary,Button } from "../../components/buttons";
import {Environment} from "../../datas";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { styles } from "../../styles";

type TProps = {};

export const NewPrescriptionScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [pharmacy, setPharmacy] = useState(null);
  const [nextStep,setNextStep]=useState(false);
  const [drug_name,setDrugName]=useState("");
  const [dosage,setDosage]=useState("");
  const [pharmacies,setPharmacies]=useState([]);
  const [comment,setComment]=useState("");
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);


  const member =JSON.parse(route.params["member"]);



  const onPressAppointment = () => {
    navigation.navigate(NavigationNames.AppointmentScreen);
  };


  const postPrescription = () => {
    setLoading(true);
  
    let bd = JSON.stringify({
        profile_id: member.id,
        clinician_id: profile.id,
        comment:comment,
        pharmacy_id:pharmacy,
        drugs:drugs
    });
     // console.log(bd);


    fetch(Environment.SERVER_API + '/api/prescription/post', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+profile.token
        },
        body: bd
    })
        .then((response) => {
            //alert(JSON.stringify(response, null, 4));

            let result = response.json();

            return result;
        })
        .then((responseData) => {
            //navigation.navigate("Home");
             //alert(JSON.stringify(responseData));
             setSuccess(true);
             setLoading(false);
           // console.log("response: " + JSON.stringify(responseData)); 
            
        }).catch(function(error) {
            setError(true);
            setLoading(false);
            //alert('There has been a problem with your fetch operation: ' + error.message);
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
            });
}

  const addDrug=()=>{

    let new_drugs=drugs;
    new_drugs.push({drug:drug_name,dosage:dosage});
    setDrugs(new_drugs);
    setDrugName("");
    setDosage("");
  };


  const getPharmacies = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      }
    };

    console.log('Bearer '+profile.token)
    fetch(Environment.SERVER_API+"/api/pharmacy/get", request)
      .then(async response => 
        {
          //console.log(JSON.stringify(response, null, 4));
          return await response.json();
        })
      .then(responseJson => {
        // console.log(responseJson);
        setPharmacies(responseJson);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        alert(error);
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
      getPharmacies();
    }
  
  
  }, [profile]);



  if (profile === null) {
    return <Text>Loading</Text>;
  }

  if (nextStep){
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
         {/*  <Item title={getString("Cancel")}  /> */}
         <Button
          title={getString("Submit")}
          onPress={()=>{postPrescription()}}
        />
        </HeaderButtons>
      )
    });
  }

  return (

            <SafeAreaView style={styles.flex1}>

            {(nextStep && !success) && 

            
            <View style={styles.scrollContainer}>
                {error && <Text style={styles.errorText}>There was an error posting your prescription</Text> }
                
                {isLoading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />
                }
              <Text style={styles.label_titleText}>Select pharmacy</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setPharmacy(itemValue)} selectedValue={pharmacy}
        >
         <Picker.Item label="Select pharmacy"></Picker.Item>
          { pharmacies.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        </Picker>
      </View>
      <Text style={styles.label_titleText}>Address</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setPharmacy(itemValue)} selectedValue={pharmacy}
        >
         <Picker.Item label="Address"></Picker.Item>
          { pharmacies.map((item, key)=>(
            <Picker.Item label={item.address} value={item.id} key={key} />)
            )}
        </Picker>
      </View>
      <Text style={styles.label_titleText}>Email</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setPharmacy(itemValue)} selectedValue={pharmacy}
        >
         <Picker.Item label="Email"></Picker.Item>
          { pharmacies.map((item, key)=>(
            <Picker.Item label={item.email} value={item.id} key={key} />)
            )}
        </Picker>
      </View>
      <Text style={styles.label_titleText}>Phone No.</Text>
  <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setPharmacy(itemValue)} selectedValue={pharmacy}
        >
         <Picker.Item label="Phone No."></Picker.Item>
          { pharmacies.map((item, key)=>(
            <Picker.Item label={item.phone} value={item.id} key={key} />)
            )}
        </Picker>
      </View>



      <Text style={styles.label_titleText}>Additional Comment</Text>
      <TextInput
                    style={styles.input}
                    placeholder=""
                    onChangeText={cmt => setComment(cmt)}
                />



<ButtonPrimary
                    title={getString("Back")}
                   onPress={()=>{setNextStep(false)}}
                    type="outline"
                    style={styles.buttonStyle}
                />
              </View>
            }

            {(!nextStep && !success) &&
              <View style={styles.scrollContainer}>
                 <Text style={styles.nameText}>Add drug</Text>
              <Divider style={styles.divider} />
              <Text  style={styles.label_titleText}>Drug name</Text>
              <TextInput
                    style={styles.input}
                    placeholder="" value={drug_name}
                    onChangeText={name => setDrugName(name)}
                />
              <Text  style={styles.label_titleText}>Dosage</Text>
            
      <TextInput
                    style={styles.input}
                    placeholder="" value={dosage}
                    onChangeText={dsage => setDosage(dsage)}
                />
      
      <ButtonPrimary
                    title={getString("Add drug")}
                   onPress={()=>{addDrug()}}
                    type="outline"
                    style={styles.add_buttonStyle}
                />
              </View>
            }
              
              {(drugs.length > 0 && !nextStep && !success) &&
                   <ScrollView
                   style={styles.flex1}
                   contentContainerStyle={styles.scrollContainer}
                 >
                   
               {drugs.map((item,index)=>{
                 return (      <View key={index}>
                   <Text style={styles.drug_nameText}>{item.drug}</Text>
                   <Text style={styles.dosage_nameText}>{item.dosage}</Text>
     
                   <Divider style={styles.divider} />
                 </View>);
               })}
                  
                  <ButtonPrimary
                    title={getString("Continue")}
                   onPress={()=>{setNextStep(true)}}
                    type="outline"
                    style={styles.buttonStyle}
                />
                 </ScrollView>



              }

              {success && 
              <View>
              <Text style={styles.titleText}>Prescription has been sent successfully</Text>
              <Button
                      title={getString("Go to Prescriptions")}
                      onPress={()=>{navigation.navigate(NavigationNames.PrescriptionsScreen)}}
                    />
            </View>
              }



          </SafeAreaView>


  );
};
const styles_ = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { marginLeft: 10,marginRight:10 },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: 16
  },
  nameText: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 16,
    color: Theme.colors.black
  },
  titleText: {
  
    fontSize: 22,
    fontWeight: "400",
    marginTop: 12,
    marginBottom:10,
    color: Theme.colors.primaryColor
  },
  daysText: {
    alignSelf: "center",
    fontSize: 14,
    marginTop: 6,
    color: Theme.colors.black
  },
  menuRowContent: {
    flexDirection: "row",
   /*  paddingStart: 12, */
    paddingEnd: 16,
    paddingVertical: 16,
  /*   marginBottom:16,
    marginTop:16, */
    borderWidth:1,
    borderColor:Theme.colors.gray,
    margin:16,
    borderRadius:5
  },
  iconContent: {
    width: 32
  },
  menuRowsContent: { paddingHorizontal: 8, flex: 1 },
  menuRowTitle: {
    fontSize: 25,
    alignSelf: "center",
  },
  menuRowSubtitle: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: "center",
    fontWeight: "800",
    color:Theme.colors.primaryColorDark
  },
  divider: { marginTop:5 },
  upcomingAppoinmentRow: {
    margin:5,
    marginHorizontal: 16
  },
  pickerstyle: {
    height: 50,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: Theme.colors.primaryColor,
    borderRadius: 5,
    marginTop: 10,
    
  },
  label_titleText: {
    fontSize: 17,
    fontWeight: "600",
    color: Theme.colors.black,
    paddingTop: 5
  },
  input: {
    height: 50,
    borderRadius: 5,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
},   
buttonStyle: {
  marginTop: 10,
  alignSelf: 'stretch',
  fontSize: 20,

},
add_buttonStyle: {
  marginTop: 10,
  alignSelf: 'flex-end',
  fontSize: 20,

},
drug_nameText: {
  fontSize: 18,
  fontWeight: "400",
  marginLeft: 10,
  color: Theme.colors.primaryColor
},
dosage_nameText: {
  fontSize: 15,
  fontWeight: "400",
  marginLeft: 10,
  marginBottom:5,
  color: Theme.colors.black
},

errorText: {
  fontSize: 15,
  fontWeight: "400",
  marginLeft: 10,
  marginBottom:5,
  color: "red"
},
});
