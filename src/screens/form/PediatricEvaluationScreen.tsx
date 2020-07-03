import React, { useState ,useEffect} from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Picker,AsyncStorage,ActivityIndicator
} from "react-native";
import { Theme } from "../../theme";
import { ButtonPrimary } from "../../components";
import { useLocalization } from "../../localization";
import { StoryViewerModal } from "../../modals";
import { storyList, mediaList } from "../../datas";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import moment from "moment";
import {Environment} from "../../datas";
import { styles } from "../../styles";

type TProps = {};


export const PediatricEvaluationScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const[options,setOptions]=useState([]);
  const[loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const [formData,setFormData]=useState({});

  const [visitDate,setVisitDate]=useState('');
  const [complaiant,setComplaiant]=useState('');
  const [symptoms,setSymptons]=useState([]);
  const [familyHistory,setFamilyHistory]=useState('');
  const [pastMedicalProbelms,setPastMedicalProbelms]=useState('');
  const [illnessSinceLastVisit,setIllnessSinceLastVisit]=useState('');
  const [drugAllergy,setDrugAllergy]=useState('');
  const [temp,setTemp]=useState('');
  const [pulse,setPulse]=useState('');
  const [bp,setBp]=useState('');
  const [weight,setWeight]=useState('');
  const [ht_lt,setht_lt]=useState('');
  const [headCircumference,setHeadCircumference]=useState('');
  const [midUpperArm,setMidUpperArm]=useState('');
  const [visitSummary,setVisitSummary]=useState('');
  const [medication,setMedication]=useState('');
  const [referral,setReferral]=useState('');
  const [additionalInformation,setAdditionalInformation]=useState('');
  const [nextVisit,setNextVisit]=useState('');



  



 const get_category_options=(category)=>{

  var option_values=options;
  var lookups = option_values.filter(function(item){
    return item.category==category;
    }).map(function({id, value}){
      return {id, value};
    });

   // alert(lookups);
  return lookups;
};

let form_data={};

const update_values=(key,value)=>{
  form_data=formData;

  /* Object.entries(form_data).forEach((entry)=>{
    entry.
  });
  form_data = form_data.filter(function(item){
    if (item){
        item.cost=Number(value);
    }
    return item;
 }); */
};

const update_value=(key,value)=>{
  form_data=formData;
  form_data[key]=value;

  setFormData(form_data);

}

  useEffect(() => {
    async function load_profile() {
      try{
        let prfile = await AsyncStorage.getItem('profile').
        then((data) => {
          setProfile(JSON.parse(data));
         
      }); 
        
      }catch(error){
        console.log(error);
      }
     
    }
   load_profile();
   
  }, []);

  useEffect(() => {
   
      try{
        if (profile  != null){
          get_lookups();
          get_family_intake();
        }
      }catch(error){
        console.log(error);
      }
  
  }, [profile]);



  const get_family_intake = () => {
    setLoading(true);
    if (profile != null ){

      let request = {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'Authorization': 'Bearer '+profile.token
        }
      };

      
      fetch(Environment.SERVER_API+"/api/form/GetPediatricEvaluation?appointment_id=fea9dd85-1a35-4dda-ac7a-4548d13b53de", request)
        .then(async response => {
          console.log(JSON.stringify(response, null, 4));
          //alert(response);
          return await response.json();
         
        })
        .then(responseJson => {
          setFormData(responseJson);
          setVisitDate(responseJson["visit_date"]);
          setComplaiant(responseJson["complaiant"]);
          setFamilyHistory(responseJson["family_history"]);
          setPastMedicalProbelms(responseJson["past_medical_probelms"]);
          setIllnessSinceLastVisit(responseJson["illness_since_last_visit"]);
          setDrugAllergy(responseJson["drug_allergy"]);
          setTemp(responseJson["temp"]);
          setPulse(responseJson["pulse"]);
          setBp(responseJson["bp"]);
          setWeight(responseJson["weight"]);
          setht_lt(responseJson["ht_lt"]);

          setHeadCircumference(responseJson["head_circumference"]);
          setMidUpperArm(responseJson["mid_upper_arm"]);
          setVisitSummary(responseJson["visit_summary"]);
          setMedication(responseJson["medication"]);
          setReferral(responseJson["referral"]);
          setAdditionalInformation(responseJson["additional_information"]);
          setNextVisit(responseJson["next_visit"]);
         





          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          //alert(error);
        });
    }else{
      //console.log(profile);
    }
   
    }

  const get_lookups = () => {
    setLoading(true);
    if (profile != null ){

      let request = {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'Authorization': 'Bearer '+profile.token
        }
      };

      
      fetch(Environment.SERVER_API+"/api/Options/GetLookups", request)
        .then(async response => {
          console.log(JSON.stringify(response, null, 4));
          //alert(response);
          return await response.json();
         
        })
        .then(responseJson => {
          setOptions(responseJson);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          //alert(error);
        });
    }else{
      //console.log(profile);
    }
   
    }

  return (
    <View style={[styles.container,{marginTop:15}]}>
       {loading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />}

{error && <Text style={[styles.errorText,{marginTop:-10,margin:10}]}>There was an error updating your password. Please check your connection and try again</Text> }
    {success && <Text style={[styles.successText]}>Your password has been updated successfully.</Text> }
<ScrollView style={[styles.scrollContainer,{marginBottom:10}]}>

            <View>
              <Text style={styles.label_titleText}>Visit Date</Text>
              <TextInput style={styles.input}  value={visitDate} onChangeText={value=>{update_value("visit_date",value);setVisitDate(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Present complain</Text>
              <TextInput style={styles.input}  value={complaiant} onChangeText={value=>{update_value("complaiant",value);setComplaiant(value)}} />
            </View>

            
            <View>
              <Text style={styles.label_titleText}>Family history/additional comments</Text>
              <TextInput style={styles.input}  value={familyHistory} onChangeText={value=>{update_value("family_history",value);setFamilyHistory(value)}} />
            </View>


            <View>
              <Text style={styles.label_titleText}>Past medical Problems</Text>
              <TextInput style={styles.input}  value={pastMedicalProbelms} onChangeText={value=>{update_value("past_medical_probelms",value);setPastMedicalProbelms(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Illnesses since last visit</Text>
              <TextInput style={styles.input}  value={illnessSinceLastVisit} onChangeText={value=>{update_value("illness_since_last_visit",value);setIllnessSinceLastVisit(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Drug Allergies</Text>
              <TextInput style={styles.input}  value={drugAllergy} onChangeText={value=>{update_value("drug_allergy",value);setDrugAllergy(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Temp. (C)</Text>
              <TextInput style={styles.input}  value={temp} onChangeText={value=>{update_value("temp",value);setTemp(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Pulse</Text>
              <TextInput style={styles.input}  value={pulse} onChangeText={value=>{update_value("pulse",value);setPulse(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Bp (mm/Hg)</Text>
              <TextInput style={styles.input}  value={bp} onChangeText={value=>{update_value("bp",value);setBp(value)}} />
            </View>
   
            <View>
              <Text style={styles.label_titleText}>Weight (kg)</Text>
              <TextInput style={styles.input}  value={weight} onChangeText={value=>{update_value("weight",value);setWeight(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Ht/Lt (cm)</Text>
              <TextInput style={styles.input}  value={ht_lt} onChangeText={value=>{update_value("ht_lt",value);setht_lt(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Head Cir. (cm)</Text>
              <TextInput style={styles.input}  value={headCircumference} onChangeText={value=>{update_value("head_circumference",value);setHeadCircumference(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Mid Upper arm cir.(cm)</Text>
              <TextInput style={styles.input}  value={midUpperArm} onChangeText={value=>{update_value("mid_upper_arm",value);setMidUpperArm(value)}} />
            </View>
            
 

            <View>
              <Text style={styles.label_titleText}>Summary of Visit</Text>
              <TextInput style={styles.input} value={visitSummary} onChangeText={value=>{update_value("visit_summary",value);setVisitSummary(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}> Medication </Text>
              <TextInput style={styles.input} value={medication} onChangeText={value=>{update_value("medication",value);setMedication(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}> Refferral </Text>
              <TextInput style={styles.input} value={referral} onChangeText={value=>{update_value("referral",value);setReferral(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Additional information</Text>
              <TextInput style={styles.input} value={additionalInformation} onChangeText={value=>{update_value("additional_information",value);setAdditionalInformation(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Next visit</Text>
              <TextInput style={styles.input}  value={nextVisit} onChangeText={value=>{update_value("next_visit",value);setNextVisit(value)}} />
            </View>
          

<ButtonPrimary
                    title={getString("Submit")}
                   onPress={()=>{}}
                    type="outline"
                    style={styles.buttonStyle}
                />

</ScrollView>

   
    </View>
  );
};
