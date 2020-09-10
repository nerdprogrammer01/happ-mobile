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


export const PsychiatricProgressScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const[options,setOptions]=useState([]);
  const[loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const [formData,setFormData]=useState({});

  const [dateOfService,setDateOfService]=useState('');
  const [server,setServer]=useState('');
  const [startTime,setStartTime]=useState('');
  const [stopTime,setStopTime]=useState('');
  const [lengthOfSession,setLengthOfSesstion]=useState('');
  const [typeOfSession,setTypeOfSession]=useState('');
  const [serviceCode,setServicCode]=useState('');
  const [visitReason,setVisitReason]=useState('');
  const [pastHistory,setPastHistory]=useState('');
  const [familyHistory,setFamilyHistory]=useState('');
  const [weight,setWeight]=useState('');
  const [height,setHeight]=useState('');
  const [bloodPressure,setBloodPressure]=useState('');
  const [pulse,setPulse]=useState('');
  const [psychiatrictExamNote,setPsychiatricExamNote]=useState('');
  const [allergies,setAllergies]=useState('');
  const [additionalComent,setAdditionalComment]=useState('');
  const [riskAndBenefitNote,setRiskAndBenefitNote]=useState('');
  //const [nextVisit,setNextVisit]=useState('');
  const [cansubmit,setCanSubmit]=useState(false);


  



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

          if (profile.role=="clinician"){
            setCanSubmit(true);
        }
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

      
      fetch(Environment.SERVER_API+"/api/form/GetPsychiatricProgress?appointment_id=fea9dd85-1a35-4dda-ac7a-4548d13b53de", request)
        .then(async response => {
          console.log(JSON.stringify(response, null, 4));
          //alert(response);
          return await response.json();
         
        })
        .then(responseJson => {
          setFormData(responseJson);
          setDateOfService(responseJson["date_of_service"]);
          setServer(responseJson["server"]);
          setFamilyHistory(responseJson["family_history"]);
          setStartTime(responseJson["start_time"]);
          setStopTime(responseJson["stop_time"]);
          setLengthOfSesstion(responseJson["length_of_session"]);
          setTypeOfSession(responseJson["temp"]);
          setPulse(responseJson["type_of_session"]);
          setServicCode(responseJson["service_code"]);
          setWeight(responseJson["weight"]);
          setHeight(responseJson["height"]);

          setVisitReason(responseJson["visit_reason"]);
          setPastHistory(responseJson["past_history"]);
          setBloodPressure(responseJson["blood_pressure"]);
          setPulse(responseJson["pulse"]);
          setPsychiatricExamNote(responseJson["psychiatric_exam_note"]);
          setAdditionalComment(responseJson["additional_comment"]);
          setRiskAndBenefitNote(responseJson["risk_and_benefit_note"]);
         





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
              <Text style={styles.label_titleText}>Date of Service</Text>
              <TextInput style={styles.input}  value={dateOfService} onChangeText={value=>{update_value("date_of_service",value);setDateOfService(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Server</Text>
              <TextInput style={styles.input}  value={server} onChangeText={value=>{update_value("server",value);setServer(value)}} />
            </View>

            
            <View>
              <Text style={styles.label_titleText}>Start Time</Text>
              <TextInput style={styles.input}  value={startTime} onChangeText={value=>{update_value("start_time",value);setStartTime(value)}} />
            </View>


            <View>
              <Text style={styles.label_titleText}>Stop Time</Text>
              <TextInput style={styles.input}  value={stopTime} onChangeText={value=>{update_value("stop_time",value);setStopTime(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Length of Session</Text>
              <TextInput style={styles.input}  value={lengthOfSession} onChangeText={value=>{update_value("length_of_session",value);setLengthOfSesstion(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Type of Session</Text>
              <TextInput style={styles.input}  value={typeOfSession} onChangeText={value=>{update_value("type_of_session",value);setTypeOfSession(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Service Code</Text>
              <TextInput style={styles.input}  value={serviceCode} onChangeText={value=>{update_value("service_code",value);setServicCode(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Reason for Visit (HPI) Include: quality, frequency, contexts, association, s and s, severity, duration, modifying facts of sxs</Text>
              <TextInput style={styles.input}  value={visitReason} onChangeText={value=>{update_value("visit_reason",value);setVisitReason(value)}} />
            </View>


            <Text style={styles.titleText}>Review of History Impacting Current Problems Any Significant Changes</Text>

            <View>
              <Text style={styles.label_titleText}>Past History</Text>
              <TextInput style={styles.input}  value={pastHistory} onChangeText={value=>{update_value("past_history",value);setPastHistory(value)}} />
            </View>
   
            <View>
              <Text style={styles.label_titleText}>Family History</Text>
              <TextInput style={styles.input}  value={familyHistory} onChangeText={value=>{update_value("family_history",value);setFamilyHistory(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Vital Signs: Height</Text>
              <TextInput style={styles.input}  value={height} onChangeText={value=>{update_value("height",value);setHeight(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Vital Signs: Weight)</Text>
              <TextInput style={styles.input}  value={weight} onChangeText={value=>{update_value("weight",value);setWeight(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Blood Pressure</Text>
              <TextInput style={styles.input}  value={bloodPressure} onChangeText={value=>{update_value("blood_pressure",value);setBloodPressure(value)}} />
            </View>
            
 

            <View>
              <Text style={styles.label_titleText}>Pulse</Text>
              <TextInput style={styles.input} value={pulse} onChangeText={value=>{update_value("pulse",value);setPulse(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}> Psychiatric exam note </Text>
              <TextInput style={styles.input} value={psychiatrictExamNote} onChangeText={value=>{update_value("psychiatric_exam_note",value);setPsychiatricExamNote(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}> Allergies </Text>
              <TextInput style={styles.input} value={allergies} onChangeText={value=>{update_value("allergies",value);setAllergies(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Additional comment</Text>
              <TextInput style={styles.input} value={additionalComent} onChangeText={value=>{update_value("additional_comment",value);setAdditionalComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Risk and benefit noe</Text>
              <TextInput style={styles.input}  value={riskAndBenefitNote} onChangeText={value=>{update_value("risk_and_benefit_note",value);setRiskAndBenefitNote(value)}} />
            </View>
          
            {cansubmit && 
    <ButtonPrimary
                    title={getString("Submit")}
                   onPress={()=>{}}
                    type="outline"
                    style={styles.buttonStyle}
                />
}

</ScrollView>

   
    </View>
  );
};
