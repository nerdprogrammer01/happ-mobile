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


export const PrimaryCareScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const[options,setOptions]=useState([]);
  const[loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const [formData,setFormData]=useState({});

  const [headBrainInjury,setHeadBrainInury]=useState(0);
  const [weightLoss,setWeightLoss]=useState(0);
  const [seizures,setSeizures]=useState(0);
  const [stroke,setStroke]=useState(0);
  const [eyeProblems,setEyeProblems]=useState(0);
  const [missingUseOfArm,setMissingUseOfArm]=useState(0);
  const [hearingProblem,setHearingProblem]=useState(0);
  const [heartDisease,setHeartDisease]=useState(0);
  const [dressingGrooming,setDressingGrooming]=useState('');
  const [facialExpression,setFacialExpression]=useState('');
  const [eyeContact,setEyeContact]=useState('');
  const [dressingGroomingComment,setDressingGroomingComment]=useState('');
  const [facialExpressionComment,setFacialExpressionComment]=useState('');
  const [eyeContactComment,setEyeContactComment]=useState('');
  const [motorActivity,setMotorActivity]=useState('');
  const [anxietyLevel,setAnxietyLevel]=useState('');
  const [agitationLevel,setAgitationLevel]=useState('');
  const [motorActivityComment,setMotorActivityComment]=useState('');
  const [anxietyLevelComment,setAnxietyLevelComment]=useState('');
  const [agitationLevelComment,setAgitationLevelComment]=useState('');

  const [productionOfSpeech,setProductionOfSpeech]=useState('');
  const [rateOfSpeech,setRateOfSpeech]=useState('');
  const [volume,setVolume]=useState('');
  const [productionOfSpeechComment,setProductionOfSpeechComment]=useState('');
  const [rateOfSpeechComment,setRateOfSpeechComment]=useState('');
  const [volumeComment,setVolumeComment]=useState('');


  const [mood,setMood]=useState('');
  const [moodComment,setMoodComment]=useState('');
  const [affect,setAffect]=useState('');
  const [affectComment,setAffectComment]=useState('');
  const [flowOfThought,setFlowOfThought]=useState('');
  const [perceptualFunction,setPerceptualFunction]=useState('');
  const [flowOfThoughtComment,setFlowOfThoughtComment]=useState('');
  const [perceptualFunctionComment,setPerceptualFunctionComment]=useState('');
  const [hallucinations,setHallucinations]=useState('');
  const [hallucinationsComment,setHallucinationsComment]=useState('');

  const [delusion,setDelusion]=useState('');
  const [delusionComment,setDelusionComment]=useState('');
  const [thoughtContent,setThoughtContent]=useState('');
  const [thoughtContentComment,setThoughtContentComment]=useState('');
  const [suicidalBehaviour,setSuicidalBehaviour]=useState('');
  const [suicidalBehaviourComment,setSuicidalBehaviourComment]=useState('');

  const [depression,setDepression]=useState('');
  const [depressionComment,setDepressionComment]=useState('');
  const [appetite,setAppetite]=useState('');
  const [sleep,setSleep]=useState('');
  const [elimination,setElimination]=useState('');
  const [commons,setCommons]=useState('');
  const [sleepComment,setSleepComment]=useState('');
  const [eliminationComment,setEliminationComment]=useState('');

  const [stateOfConciousness,setStateOfConciousness]=useState('');
  const [sensorium,setSensorium]=useState('');
  const [memory,setMemory]=useState('');
  const [stateOfConciousnessComment,setStateOfConciousnessComment]=useState('');
  const [sensoriumComment,setSensoriumComment]=useState('');
  const [memoryComment,setMemoryComment]=useState('');

  const [judgementInsight,setJudgementInsight]=useState('');
  const [impulseControl,setImpulseControl]=useState('');
  const [insight,setInsight]=useState('');
  const [judgementInsightComment,setJudgementInsightComment]=useState('');
  const [impulseControlComment,setImpulseControlComment]=useState('');
  const [insightComment,setInsightComment]=useState('');

  const [judgement,setJudgement]=useState('');
  const [interviewReaction,setInterviewReaction]=useState('');
  const [judgementComment,setJudgementComment]=useState('');
  const [interviewReactionComment,setInterviewReactionComment]=useState('');
  

  const [maritalStatus,setMaritalStatus]=useState(0);
  const [smoking,setSmoking]=useState(0);
  const [alcohol,setAlcohol]=useState(0);
  const [pastDrugUse,setPastDrugUse]=useState(0);
  const [currentDrugUse,setCurrentDrugUse]=useState('');
  
  


  



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
          setHeadBrainInury(responseJson["head_brain_injury"]);
          setWeightLoss(responseJson["weight_loss"]);
          setSeizures(responseJson["seizures"]);
          setStroke(responseJson["stroke"]);
          setEyeContact(responseJson["eye_problems"]);
          setMissingUseOfArm(responseJson["missing_use_of_arm"]);
          setHearingProblem(responseJson["hearing_problem"]);
          setMood(responseJson["mood"]);
          setAffect(responseJson["affect"]);

          setHeartDisease(responseJson["heart_disease"]);
          setDressingGrooming(responseJson["dressing_grooming"]);
          setFacialExpression(responseJson["facial_expression"]);
          setEyeContact(responseJson["eye_contacts"]);
          setDressingGroomingComment(responseJson["dressing_grooming_comment"]);
          setFacialExpressionComment(responseJson["facial_expression_comment"]);
          setEyeContactComment(responseJson["eye_contacts_comment"]);
          setMotorActivity(responseJson["motor_activity"]);
          setAnxietyLevel(responseJson["anxiety_level"]);
          setAgitationLevel(responseJson["agitation_level"]);
          setMotorActivityComment(responseJson["motor_activity_comment"]);
          setAnxietyLevelComment(responseJson["anxiety_level_comment"]);
          setAgitationLevelComment(responseJson["agitation_level_comment"]);

          setProductionOfSpeech(responseJson["production_of_speech"]);
          setRateOfSpeech(responseJson["rate_of_speech"]);
          setVolume(responseJson["volume"]);
          setProductionOfSpeech(responseJson["production_of_speech_comment"]);
          setRateOfSpeechComment(responseJson["rate_of_speech_comment"]);
          setVolumeComment(responseJson["volume_comment"]);

          setMood(responseJson["mood"]);
          setMoodComment(responseJson["mood_comment"]);
          setAffect(responseJson["affect"]);
          setAffectComment(responseJson["affect_comment"]);
          setFlowOfThought(responseJson["flow_of_thought"]);
          setPerceptualFunction(responseJson["perceptual_function"]);
          setHallucinations(responseJson["hallucinations"]);
          setFlowOfThoughtComment(responseJson["flow_of_thought_comment"])
          setPerceptualFunctionComment(responseJson["perceptual_function_comment"]);
          setHallucinationsComment(responseJson["hallucinations_comment"]);
          setDelusion(responseJson["delusion"]);
          setThoughtContent(responseJson["thought_content"]);
          setSuicidalBehaviour(responseJson["suicidal_behaviour"]);
          setDelusionComment(responseJson["delusion_comment"]);
          setThoughtContentComment(responseJson["thought_content_comment"]);
          setSuicidalBehaviourComment(responseJson["suicidal_behaviour_comment"]);
          setDepression(responseJson["depression"]);
          setDepressionComment(responseJson["depression_comment"]);
          setAppetite(responseJson["appetite"]);
          setElimination(responseJson["elimination"]);
          setCommons(responseJson["commons"]);
          setSleepComment(responseJson["sleep_comment"]);
          setEliminationComment(responseJson["elimination_comment"]);
          setStateOfConciousness(responseJson["state_of_conciousness"]);
          setSensorium(responseJson["sensorium"]);
          setMemory(responseJson["memory"]);
          setStateOfConciousnessComment(responseJson["state_of_conciousness_comment"]);
          setSensoriumComment(responseJson["sensorium_comment"]);
          setMemoryComment(responseJson["memory_comment"]);
          setJudgementInsight(responseJson["judgement_insight"]);
          setImpulseControl(responseJson["impulse_control"]);
          setInsight(responseJson["insight"]);
          setJudgementInsightComment(responseJson["judgement_insight_comment"]);
          setImpulseControlComment(responseJson["impulse_control_comment"]);
          setInsightComment(responseJson["insight_comment"]);
          setJudgement(responseJson["judgement"]);
          setInterviewReaction(responseJson["interview_reaction"]);
          setJudgementComment(responseJson["judgement_comment"]);
          setInterviewReactionComment(responseJson["interview_reaction_comment"]);
          setMaritalStatus(responseJson["marital_status"]);
          setSmoking(responseJson["smoking"]);
          setAlcohol(responseJson["alcohol"]);
          setPastDrugUse(responseJson["past_drug_use"]);
          setCurrentDrugUse(responseJson["current_drug_use"]);


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
              <Text style={styles.label_titleText}>Head/brain injuries or illnesses (e.g. Concussions)</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("head_brain_injury",itemValue);setHeadBrainInury(itemValue)}} selectedValue={headBrainInjury}
              >
                { get_category_options("yesnona").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Unexplained weight loss</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("weight_loss",itemValue);setWeightLoss(itemValue)}} selectedValue={weightLoss}
              >
                { get_category_options("yesnona").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Seizures, epilepsy</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("seizures",itemValue);setSeizures(itemValue)}} selectedValue={seizures}
              >
                { get_category_options("yesnona").map((item, key)=>(
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
              <Text style={styles.label_titleText} >Stroke, Mini-stroke Paralysis or weakness</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("stroke",itemValue);setStroke(itemValue)}} selectedValue={stroke}
              >
                { get_category_options("yesnona").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            
            <View>
              <Text style={styles.label_titleText} >Eye problems</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("eye_problems",itemValue);setEyeProblems(itemValue)}} selectedValue={eyeProblems}
              >
                { get_category_options("yesnona").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText} >Missing or limited use of arm, hand, finger, leg, foot, toe</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("missing_use_of_arm",itemValue);setMissingUseOfArm(itemValue)}} selectedValue={missingUseOfArm}
              >
                { get_category_options("yesnona").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText} >Ear and or hearing problems</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("hearing_problem",itemValue);setHearingProblem(itemValue)}} selectedValue={hearingProblem}
              >
                { get_category_options("yesnona").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText} >Heart disease, heart attack, bypass, or other heart problems</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("heart_disease",itemValue);setHeartDisease(itemValue)}} selectedValue={heartDisease}
              >
                { get_category_options("yesnona").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Dressing and grooming</Text>
              <TextInput style={styles.input} value={dressingGrooming} onChangeText={value=>{update_value("dressing_grooming",value);setDressingGrooming(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}> Dressing and grooming comment</Text>
              <TextInput style={styles.input} value={dressingGroomingComment} onChangeText={value=>{update_value("dressing_grooming_comment",value);setDressingGroomingComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Facial expressions </Text>
              <TextInput style={styles.input} value={facialExpression} onChangeText={value=>{update_value("facial_expression",value);setFacialExpression(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}> Facial expressions comment</Text>
              <TextInput style={styles.input} value={facialExpressionComment} onChangeText={value=>{update_value("facial_expression_comment",value);setFacialExpressionComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            
            <View>
              <Text style={styles.label_titleText}>Eye contacts </Text>
              <TextInput style={styles.input} value={eyeContact} onChangeText={value=>{update_value("eye_contacts",value);setEyeContact(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}> Eye contacts comment</Text>
              <TextInput style={styles.input} value={eyeContactComment} onChangeText={value=>{update_value("eye_contacts_comment",value);setEyeContactComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Motor activity</Text>
              <TextInput style={styles.input} value={motorActivity} onChangeText={value=>{update_value("motor_activity",value);setMotorActivity(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Motor activity comment</Text>
              <TextInput style={styles.input} value={motorActivityComment} onChangeText={value=>{update_value("eye_contacts_comment",value);setMotorActivityComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            
            <View>
              <Text style={styles.label_titleText}>Level of anxiety</Text>
              <TextInput style={styles.input} value={anxietyLevel} onChangeText={value=>{update_value("anxiety_level",value);setAnxietyLevel(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Level of anxiety comment</Text>
              <TextInput style={styles.input} value={anxietyLevelComment} onChangeText={value=>{update_value("anxiety_level_comment",value);setAnxietyLevelComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Level of agitation</Text>
              <TextInput style={styles.input} value={agitationLevel} onChangeText={value=>{update_value("agitation_level",value);setAgitationLevel(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Level of anxiety comment</Text>
              <TextInput style={styles.input} value={agitationLevelComment} onChangeText={value=>{update_value("agitation_level_comment",value);setAgitationLevelComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Production of speech</Text>
              <TextInput style={styles.input} value={productionOfSpeech} onChangeText={value=>{update_value("production_of_speech",value);setProductionOfSpeech(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Production of speech comment</Text>
              <TextInput style={styles.input} value={productionOfSpeechComment} onChangeText={value=>{update_value("production_of_speech_comment",value);setProductionOfSpeechComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Rate of speech</Text>
              <TextInput style={styles.input} value={rateOfSpeech} onChangeText={value=>{update_value("rate_of_speech",value);setRateOfSpeech(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Rate of speech comment</Text>
              <TextInput style={styles.input} value={rateOfSpeechComment} onChangeText={value=>{update_value("rate_of_speech_comment",value);setRateOfSpeechComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Volume</Text>
              <TextInput style={styles.input} value={volume} onChangeText={value=>{update_value("volume",value);setVolume(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Volume comment</Text>
              <TextInput style={styles.input} value={volumeComment} onChangeText={value=>{update_value("volume_comment",value);setVolumeComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Mood</Text>
              <TextInput style={styles.input} value={mood} onChangeText={value=>{update_value("mood",value);setMood(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Mood comment</Text>
              <TextInput style={styles.input} value={moodComment} onChangeText={value=>{update_value("mood_comment",value);setMoodComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Affect</Text>
              <TextInput style={styles.input} value={affect} onChangeText={value=>{update_value("affect",value);setAffect(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Affect comment</Text>
              <TextInput style={styles.input} value={affectComment} onChangeText={value=>{update_value("affect_comment",value);setAffectComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Flow of thought</Text>
              <TextInput style={styles.input} value={flowOfThought} onChangeText={value=>{update_value("flow_of_thought",value);setFlowOfThought(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Flow of thought comment</Text>
              <TextInput style={styles.input} value={flowOfThoughtComment} onChangeText={value=>{update_value("flow_of_thought_comment",value);setFlowOfThoughtComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>
            

            
            <View>
              <Text style={styles.label_titleText}>Hallucinations</Text>
              <TextInput style={styles.input} value={hallucinations} onChangeText={value=>{update_value("hallucinations",value);setHallucinations(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Hallucinations comment</Text>
              <TextInput style={styles.input} value={hallucinationsComment} onChangeText={value=>{update_value("hallucinations_comment",value);setHallucinationsComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>
            
              
            <View>
              <Text style={styles.label_titleText}>Delusions</Text>
              <TextInput style={styles.input} value={delusion} onChangeText={value=>{update_value("delusion",value);setDelusion(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Delusion comment</Text>
              <TextInput style={styles.input} value={delusionComment} onChangeText={value=>{update_value("delusion_comment",value);setDelusionComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>
            
            <View>
              <Text style={styles.label_titleText}>Thought content</Text>
              <TextInput style={styles.input} value={thoughtContent} onChangeText={value=>{update_value("thought_content",value);setThoughtContent(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Thought content comment</Text>
              <TextInput style={styles.input} value={thoughtContentComment} onChangeText={value=>{update_value("thought_content_comment",value);setThoughtContentComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Suicidal Behavior</Text>
              <TextInput style={styles.input} value={suicidalBehaviour} onChangeText={value=>{update_value("suicidal_behaviour",value);setSuicidalBehaviour(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Suicidal Behavior comment</Text>
              <TextInput style={styles.input} value={suicidalBehaviourComment} onChangeText={value=>{update_value("suicidal_behaviour_comment",value);setSuicidalBehaviourComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Depression</Text>
              <TextInput style={styles.input} value={depression} onChangeText={value=>{update_value("depression",value);setDepression(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Depression comment</Text>
              <TextInput style={styles.input} value={depressionComment} onChangeText={value=>{update_value("depression_comment",value);setDepressionComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            
            <View>
              <Text style={styles.label_titleText}>Appetite</Text>
              <TextInput style={styles.input} value={appetite} onChangeText={value=>{update_value("appetite",value);setAppetite(value)}}  />
            </View>

              
            <View>
              <Text style={styles.label_titleText}>Sleep</Text>
              <TextInput style={styles.input} value={sleep} onChangeText={value=>{update_value("sleep",value);setSleep(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Sleep comment</Text>
              <TextInput style={styles.input} value={sleepComment} onChangeText={value=>{update_value("sleep_comment",value);setSleepComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

        
            <View>
              <Text style={styles.label_titleText}>Elimination</Text>
              <TextInput style={styles.input} value={elimination} onChangeText={value=>{update_value("elimination",value);setElimination(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Elimination comment</Text>
              <TextInput style={styles.input} value={eliminationComment} onChangeText={value=>{update_value("elimination_comment",value);setEliminationComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>


            <View>
              <Text style={styles.label_titleText}>State of Consciousness</Text>
              <TextInput style={styles.input} value={stateOfConciousness} onChangeText={value=>{update_value("state_of_conciousness",value);setStateOfConciousness(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>State of Consciousness comment</Text>
              <TextInput style={styles.input} value={stateOfConciousnessComment} onChangeText={value=>{update_value("state_of_conciousness_comment",value);setStateOfConciousnessComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            
            <View>
              <Text style={styles.label_titleText}>Sensorium (Oriented)</Text>
              <TextInput style={styles.input} value={sensorium} onChangeText={value=>{update_value("sensorium",value);setSensorium(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Sensorium comment</Text>
              <TextInput style={styles.input} value={sensoriumComment} onChangeText={value=>{update_value("sensorium_comment",value);setSensoriumComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Memory</Text>
              <TextInput style={styles.input} value={memory} onChangeText={value=>{update_value("memory",value);setMemory(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Memory comment</Text>
              <TextInput style={styles.input} value={memoryComment} onChangeText={value=>{update_value("memory_comment",value);setMemoryComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Judgement and Insight</Text>
              <TextInput style={styles.input} value={judgementInsight} onChangeText={value=>{update_value("judgement_insight",value);setJudgementInsight(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Judgement and Insight comment</Text>
              <TextInput style={styles.input} value={judgementInsightComment} onChangeText={value=>{update_value("judgement_insight_comment",value);setJudgementInsightComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Impulse Control</Text>
              <TextInput style={styles.input} value={impulseControl} onChangeText={value=>{update_value("impulse_control",value);setImpulseControl(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Impulse Control comment</Text>
              <TextInput style={styles.input} value={impulseControlComment} onChangeText={value=>{update_value("impulse_control_comment",value);setImpulseControlComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Insight</Text>
              <TextInput style={styles.input} value={insight} onChangeText={value=>{update_value("insight",value);setInsight(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Insight comment</Text>
              <TextInput style={styles.input} value={insightComment} onChangeText={value=>{update_value("insight_comment",value);setInsightComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>


            <View>
              <Text style={styles.label_titleText}>Judgement</Text>
              <TextInput style={styles.input} value={judgement} onChangeText={value=>{update_value("judgement",value);setJudgement(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Judgement comment</Text>
              <TextInput style={styles.input} value={judgementComment} onChangeText={value=>{update_value("judgement_comment",value);setJudgementComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Reaction to interview</Text>
              <TextInput style={styles.input} value={interviewReaction} onChangeText={value=>{update_value("interview_reaction",value);setInterviewReaction(value)}}  />
            </View>

            <View>
              <Text style={styles.label_titleText}>Reaction to interview comment</Text>
              <TextInput style={styles.input} value={interviewReactionComment} onChangeText={value=>{update_value("interview_reaction_comment",value);setInterviewReactionComment(value)}} multiline={true}
    numberOfLines={4} />
            </View>



            <View>
              <Text style={styles.label_titleText}>Marital Status</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("marital_status",itemValue);setMaritalStatus(itemValue)}} selectedValue={maritalStatus}
              >
                { get_category_options("marital_status").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>


            <View>
              <Text style={styles.label_titleText}>Smoking</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("smoking",itemValue);setSmoking(itemValue)}} selectedValue={smoking}
              >
                { get_category_options("drug_use").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            
            <View>
              <Text style={styles.label_titleText}>Alchohol</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("alcohol",itemValue);setAlcohol(itemValue)}} selectedValue={alcohol}
              >
                { get_category_options("alcohol").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>


            <View>
              <Text style={styles.label_titleText}>Drug Used in the past</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("past_drug_use",itemValue);setPastDrugUse(itemValue)}} selectedValue={pastDrugUse}
              >
                { get_category_options("yesnona").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            <View>
              <Text style={styles.label_titleText}>Drug used currently</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("current_drug_use",itemValue);setCurrentDrugUse(itemValue)}} selectedValue={currentDrugUse}
              >
                { get_category_options("yesnona").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
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
