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
import { useNavigation,useRoute } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import moment from "moment";
import {Environment} from "../../datas";
import { styles } from "../../styles";

type TProps = {};


export const FamilyIntakeScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const route = useRoute();
  const [profile, setProfile] = useState(null);
  const[options,setOptions]=useState([]);
  const[loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const [formData,setFormData]=useState({});

  const [relationship,setRelationship]=useState(0);
  const [partnerName,setPartnerName]=useState('');
  const [partnerPhone,setPartnerPhone]=useState('');
  const [partnerEmail,setPartnerEmail]=useState('');
  const [partnerDob,setPartnerDob]=useState('');
  const [gender,setGender]=useState(0);
  const [suicidal,setSuicidal]=useState(0);
  const [suicidalDetails,setSuicidalDetails]=useState('');
  const [hospitalizedMental,setHospitalizedMental]=useState(0);
  const [hospitalizedMentalSummary,setHospitalizedMentalSummary]=useState('');
  const [memberReceivingCounseling,setMemberReceivingCounseling]=useState(0);
  const [memberReceivingCounselingSummary,setMemberReceivingCounselingSummary]=useState('');
  const [counselingReason,setCounselingReason]=useState('');
  const [successDetermination,setSuccessDetermination]=useState('');
  const [familyStrength,setFamilyStrength]=useState('');
  const [familyWeakness,setFamilyWeakness]=useState('');
  const [dealWithConflict,setDealWithConflict]=useState('');
  const [howFamilyCelebrate,setHowFamilyCelebrate]=useState('');
  const [togetherActivities,setTogetherActivities]=useState('');
  const [familyReactionToIssues,setFamilyReactionToIssues]=useState('');
  const [familyViolence,setFamilyViolence]=useState(0);
  const [familyViolenceSummary,setFamilyViolenceSummary]=useState('');
  const [cansubmit,setCanSubmit]=useState(false);
  

  const appointment_id =route.params["appointment_id"];
  const profile_id =route.params["profile_id"];

  



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


      //console.log(JSON.stringify(request));
      
      fetch(Environment.SERVER_API+"/api/form/GetFamilyIntake?appointment_id="+appointment_id, request)
        .then(async response => {
          console.log(JSON.stringify(response, null, 4));
          //alert(response);
          return await response.json();
         
        })
        .then(responseJson => {
          setFormData(responseJson);
          setPartnerName(responseJson["partner_name"]);
          setPartnerPhone(responseJson["partner_phone"]);
          setPartnerEmail(responseJson["partner_email"]);
          setPartnerDob(responseJson["partner_dob"]);
          setSuicidal(responseJson["suicidal"]);
          setSuicidalDetails(responseJson["suicidal_details"]);
          setHospitalizedMental(responseJson["hospitalized_mental"]);
          setHospitalizedMentalSummary(responseJson["hospitalized_mental_summary"]);
          setMemberReceivingCounseling(responseJson["member_receiving_counselling"]);
          setMemberReceivingCounselingSummary(responseJson["member_receiving_counseling_summary"]);
          setCounselingReason(responseJson["counseling_reason"]);

          setSuccessDetermination(responseJson["success_determination"]);
          setFamilyStrength(responseJson["family_strength"]);
          setFamilyWeakness(responseJson["family_weakness"]);
          setDealWithConflict(responseJson["deal_with_conflict"]);
          setHowFamilyCelebrate(responseJson["how_family_celebrate"]);
          setTogetherActivities(responseJson["together_activities"]);
          setFamilyReactionToIssues(responseJson["family_reaction_to_issues"]);
          setFamilyViolence(responseJson["family_violence"]);
          setFamilyViolenceSummary(responseJson["family_violence_summary"]);






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


    const post_form = () => {
      setLoading(true);
      setSuccess(false);
      setError(false);

    
      formData["profile_id"]=profile_id;
    
      let bd = JSON.stringify(formData);
  
  
      fetch(Environment.SERVER_API + '/api/form/PostFamilyIntake', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+profile.token
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
  

  return (
    <View style={[styles.container,{marginTop:15}]}>
       {loading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />}

{error && <Text style={[styles.errorText,{marginTop:-10,margin:10}]}>There was an error updating form. Please check your connection and try again</Text> }
    {success && <Text style={[styles.successText]}>Your form has been updated successfully.</Text> }
<ScrollView style={[styles.scrollContainer,{marginBottom:10}]}>
<Text style={styles.titleText}>Partner Information</Text>
   
<View>
              <Text style={styles.label_titleText}>Partner's name</Text>
              <TextInput style={styles.input}  value={partnerName} onChangeText={value=>{update_value("partner_name",value);setPartnerName(value)}} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Partner's phone</Text>
              <TextInput style={styles.input} value={partnerPhone} onChangeText={value=>{update_value("partner_phone",value);setPartnerPhone(value)}}/>
            </View>

            <View>
              <Text style={styles.label_titleText}>Partner's email</Text>
              <TextInput style={styles.input} value={partnerEmail} onChangeText={value=>{update_value("partner_email",value);setPartnerEmail(value)}}/>
            </View>

           {/*  <View>
              <Text style={styles.label_titleText} >Partner's email</Text>
              <TextInput style={styles.input}/>
            </View> */}

            <View>
              <Text style={styles.label_titleText} >Partner's date of birth</Text>
              <TextInput style={styles.input} value={moment(partnerDob).format("YYYY-MM-DD")} onChangeText={value=>{update_value("partner_dob",value);setPartnerDob(value)}} />
            </View>

            
            <View>
              <Text style={styles.label_titleText} >Relationship</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("relationship",itemValue);setRelationship(itemValue)}} selectedValue={relationship}
              >
                { get_category_options("partner_relationship").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
            </View>
            </View>

            
            <View>
              <Text style={styles.label_titleText} >Gender</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("gender",itemValue); setGender(itemValue)}} selectedValue={gender}
              >
                { get_category_options("gender").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            <Text style={styles.titleText}>Mental Health</Text>

            <View>
              <Text style={styles.label_titleText} >Has anyone in the immediate family currently or historically been suicidal?</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("suicidal",itemValue);setSuicidal(itemValue)}} selectedValue={suicidal}
              >
                { get_category_options("yesno").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            {suicidal==1 && 
            
            <View>
              <Text style={styles.label_titleText} >Who and when?</Text>
              <TextInput style={styles.input} value={suicidalDetails} onChangeText={value=>{update_value("suicidal_details",value);setSuicidalDetails(value)}} />
            </View>
            }


<View>
              <Text style={styles.label_titleText} >Has anyone in the immediate family been hospitalized for mental health related issues?</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("hospitalized_mental",itemValue);setHospitalizedMental(itemValue)}} selectedValue={hospitalizedMental}
              >
                { get_category_options("yesno").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            {hospitalizedMental==1 && 
            
            <View>
              <Text style={styles.label_titleText} >Who and when?</Text>
              <TextInput style={styles.input} value={hospitalizedMentalSummary} onChangeText={value=>{update_value("hospitalized_mental_summary",value);setHospitalizedMentalSummary(value)}} />
            </View>
            }

<View>
              <Text style={styles.label_titleText} >Is anyone in the immediate family currently receiving counseling services with another professional?</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("member_receiving_counseling",itemValue);setMemberReceivingCounseling(itemValue)}} selectedValue={memberReceivingCounseling}
              >
                { get_category_options("yesno").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            {memberReceivingCounseling==1 && 
            
            <View>
              <Text style={styles.label_titleText} >Who and when?</Text>
              <TextInput style={styles.input} value={memberReceivingCounselingSummary} onChangeText={value=>{update_value("member_receiving_counseling_summary",value);setMemberReceivingCounselingSummary(value)}} />
            </View>
            }

<Text style={styles.titleText}>Family Counseling</Text>
<View>
              <Text style={styles.label_titleText} >Reasons for Seeking Family Counseling</Text>
              <TextInput style={styles.input} value={counselingReason} onChangeText={value=>{update_value("counseling_reason",value);setCounselingReason(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText} >How would you know that your time in therapy has been successful? What would look different in your family?</Text>
              <TextInput style={styles.input} value={successDetermination} onChangeText={value=>{update_value("success_determination",value);setSuccessDetermination(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText} >List some strengths in your family</Text>
              <TextInput style={styles.input} value={familyStrength} onChangeText={value=>{update_value("family_strength",value);setFamilyStrength(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText} >List some weaknesses in your family</Text>
              <TextInput style={styles.input} value={familyWeakness} onChangeText={value=>{update_value("family_weakness",value);setFamilyWeakness(value)}} multiline={true}
    numberOfLines={4} />
            </View>
            <View>
              <Text style={styles.label_titleText} >How does your family deal with conflict?</Text>
              <TextInput style={styles.input} value={dealWithConflict} onChangeText={value=>{update_value("deal_with_conflict",value);setDealWithConflict(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText} >How does your family celebrate/play together?</Text>
              <TextInput style={styles.input} value={howFamilyCelebrate} onChangeText={value=>{update_value("how_family_celebrate",value);setHowFamilyCelebrate(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}> What are things that your family does together on a regular (weekly) basis?</Text>
              <TextInput style={styles.input} value={togetherActivities} onChangeText={value=>{update_value("together_activities",value);setTogetherActivities(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>How does your family deal with major life events (i.e. weddings, deaths, life threatening illnesses, job loss)?</Text>
              <TextInput style={styles.input} value={familyReactionToIssues} onChangeText={value=>{update_value("family_reaction_to_issues",value);setFamilyReactionToIssues(value)}} multiline={true}
    numberOfLines={4} />
            </View>

            <View>
              <Text style={styles.label_titleText}>Has anyone in the family ever struck, physically restrained, used violence against, or injured any person within the family?</Text>
              <View style={styles.pickerstyle}>
              <Picker
                 onValueChange={(itemValue, itemIndex) =>{ update_value("family_violence",itemValue);setFamilyViolence(itemValue)}} selectedValue={familyViolence}
              >
                { get_category_options("yesno").map((item, key)=>(
                  <Picker.Item label={item.value} value={item.id} key={key} />)
                  )}
              </Picker>
              </View>
            </View>

            
            {familyViolence==1 && 
            
            <View>
              <Text style={styles.label_titleText} >If yes, please explain</Text>
              <TextInput style={styles.input} value={familyViolenceSummary} onChangeText={value=>{update_value("family_violence_summary",value);setFamilyViolenceSummary(value)}} />
            </View>
            }



{cansubmit && 
    <ButtonPrimary
                    title={getString("Submit")}
                   onPress={()=>{post_form()}}
                    type="outline"
                    style={styles.buttonStyle}
                />
}

</ScrollView>

   
    </View>
  );
};
