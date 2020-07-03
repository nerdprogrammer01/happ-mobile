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


export const ProgressNoteScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const[options,setOptions]=useState([]);
  const[loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const [formData,setFormData]=useState({});

  const [appetite,setAppetite]=useState(0);
  const [sleep,setSleep]=useState(0);
  const [sideEffects,setSideEffects]=useState(0);
  const [meditationEfficacy,setMedicationEfficay]=useState(0);
  const [meditationCompliance,setMeditationCompliance]=useState(0);
  const [comments,setComments]=useState('');
  const [orientation,setOrientation]=useState(0);
  const [rapport,setRapport]=useState(0);
  const [appearance,setAppearance]=useState(0);
  const [mood,setMood]=useState(0);
  const [affect,setAffect]=useState(0);
  const [speech,setSpeech]=useState(0);
  const [thoughtProcess,setThoughtProcess]=useState(0);
  const [insight,setInsight]=useState(0);
  const [judgement,setJudgement]=useState(0);
  const [cognitive,setCognitive]=useState(0);
  const [psychomotorActivity,setPsychomotorActivity]=useState(0);
  const [memoryImmediate,setMemoryImmediate]=useState(0);
  const [memoryRecent,setMemoryRecent]=useState(0);
  const [memoryPast,setMemoryPast]=useState(0);
  const [memoryComments,setMemoryComments]=useState('');
  const [assessment,setAssessment]=useState(0);
  const [assessmentDescription,setAssessmentDescription]=useState('');
  const [plan,setPlan]=useState('');
  


  



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

      
      fetch(Environment.SERVER_API+"/api/form/GetProgressNote?appointment_id=fea9dd85-1a35-4dda-ac7a-4548d13b53de", request)
        .then(async response => {
          console.log(JSON.stringify(response, null, 4));
          //alert(response);
          return await response.json();
         
        })
        .then(responseJson => {
          setFormData(responseJson);
          setAppetite(responseJson["appetite"]);
          setSleep(responseJson["sleep"]);
          setSideEffects(responseJson["side_effects"]);
          setMedicationEfficay(responseJson["meditation_efficacy"]);
          setMeditationCompliance(responseJson["meditation_compliance"]);
          setComments(responseJson["comments"]);
          setOrientation(responseJson["orientation"]);
          setRapport(responseJson["rapport"]);
          setAppearance(responseJson["appearance"]);
          setMood(responseJson["mood"]);
          setAffect(responseJson["affect"]);

          setSpeech(responseJson["speech"]);
          setThoughtProcess(responseJson["thought_process"]);
          setInsight(responseJson["insight"]);
          setJudgement(responseJson["judgement"]);
          setCognitive(responseJson["cognitive"]);
          setPsychomotorActivity(responseJson["psychomotor_activity"]);
          setMemoryImmediate(responseJson["memory_immediate"]);
          setMemoryRecent(responseJson["memory_recent"]);
          setMemoryPast(responseJson["memory_past"]);
          setMemoryComments(responseJson["memory_comments"]);
          setAssessment(responseJson["assessment"]);
          setAssessmentDescription(responseJson["assessment_description"]);
          setPlan(responseJson["plan"]);





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

<Text style={styles.titleText}>Subjective findings</Text>
   
<View>
              <Text style={styles.label_titleText}>Appetite</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("appetite",itemValue);setAppetite(itemValue)}} selectedValue={appetite}
              >
                { get_category_options("appetite_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Sleep</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("sleep",itemValue);setSleep(itemValue)}} selectedValue={sleep}
              >
                { get_category_options("sleep_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Side Effects</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("side_effects",itemValue);setSideEffects(itemValue)}} selectedValue={sideEffects}
              >
                { get_category_options("side_effects_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

           {/*  <View>
              <Text style={styles.label_titleText} >Partner's email</Text>
              <TextInput style={styles.input}/>
            </View> */}

            <View>
              <Text style={styles.label_titleText} >Medication Efficacy</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("meditation_efficacy",itemValue);setMedicationEfficay(itemValue)}} selectedValue={meditationEfficacy}
              >
                { get_category_options("medication_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            
            <View>
              <Text style={styles.label_titleText} >Medication Compliance</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("meditation_compliance",itemValue);setMeditationCompliance(itemValue)}} selectedValue={meditationCompliance}
              >
                { get_category_options("medication_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Comments</Text>
              <TextInput style={styles.input} value={comments} onChangeText={value=>{update_value("comments",value);setComments(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <Text style={styles.titleText}>Objective findings</Text>
            <View>
              <Text style={styles.label_titleText} >Orientation</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("orientation",itemValue); setOrientation(itemValue)}} selectedValue={orientation}
              >
                { get_category_options("orientation_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

         

            <View>
              <Text style={styles.label_titleText} >Rapport</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("rapport",itemValue);setRapport(itemValue)}} selectedValue={rapport}
              >
                { get_category_options("rapport_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

       


        <View>
              <Text style={styles.label_titleText} >Appearance</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("appearance",itemValue);setAppearance(itemValue)}} selectedValue={appearance}
              >
                { get_category_options("appeearance_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

        <View>
              <Text style={styles.label_titleText} >Mood</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("mood",itemValue);setMood(itemValue)}} selectedValue={mood}
              >
                { get_category_options("mood_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

    

<View>
              <Text style={styles.label_titleText} >Affect</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("affect",itemValue);setAffect(itemValue)}} selectedValue={affect}
              >
                { get_category_options("affect_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText} >Speech</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("speech",itemValue);setSpeech(itemValue)}} selectedValue={speech}
              >
                { get_category_options("speech_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText} >Thought content and process</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("thought_process",itemValue);setThoughtProcess(itemValue)}} selectedValue={thoughtProcess}
              >
                { get_category_options("thought_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText} >Insight</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("insight",itemValue);setInsight(itemValue)}} selectedValue={insight}
              >
                { get_category_options("insight_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.label_titleText} >Judgement</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("judgement",itemValue);setJudgement(itemValue)}} selectedValue={judgement}
              >
                { get_category_options("insight_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText} >Cognitive</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("cognitive",itemValue);setCognitive(itemValue)}} selectedValue={cognitive}
              >
                { get_category_options("cognitive_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Psychomotor Activity</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("psychomotor_activity",itemValue);setPsychomotorActivity(itemValue)}} selectedValue={psychomotorActivity}
              >
                { get_category_options("psychomotor_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Memory Immediate</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("memory_immediate",itemValue);setMemoryImmediate(itemValue)}} selectedValue={memoryImmediate}
              >
                { get_category_options("memory_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Memory Recent</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("memory_recent",itemValue);setMemoryRecent(itemValue)}} selectedValue={memoryRecent}
              >
                { get_category_options("memory_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Memory Past</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("memory_past",itemValue);setMemoryPast(itemValue)}} selectedValue={memoryPast}
              >
                { get_category_options("memory_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>




            <View>
              <Text style={styles.label_titleText}>Memory Past</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("memory_past",itemValue);setMemoryPast(itemValue)}} selectedValue={memoryPast}
              >
                { get_category_options("memory_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Comments</Text>
              <TextInput style={styles.input} value={memoryComments} onChangeText={value=>{update_value("memory_comments",value);setMemoryComments(value)}} multiline={true}
    numberOfLines={4} />
            </View>
            <Text style={styles.titleText}>Assessment</Text>

            <View>
              <Text style={styles.label_titleText}>Psychiatric condition is generally</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("assessment",itemValue);setAssessment(itemValue)}} selectedValue={assessment}
              >
                { get_category_options("assessment_progress_note").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Description</Text>
              <TextInput style={styles.input} value={assessmentDescription} onChangeText={value=>{update_value("assessment_description",value);setAssessmentDescription(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <Text style={styles.titleText}>Plan</Text>

            <View>
              <Text style={styles.label_titleText}>Description</Text>
              <TextInput style={styles.input} value={plan} onChangeText={value=>{update_value("plan",value);setPlan(value)}} multiline={true}
    numberOfLines={4} />
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
