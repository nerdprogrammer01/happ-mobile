import React, { useState ,useEffect} from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,AsyncStorage,ActivityIndicator
} from "react-native";
import { Theme } from "../../theme";
import { Divider } from "../../components";
import { useLocalization } from "../../localization";
import { StoryViewerModal } from "../../modals";
import { storyList, mediaList } from "../../datas";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import moment from "moment";
import {Environment} from "../../datas";
import { styles } from "../../styles";

type TProps = {};


export const InboxScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const[messages,setMessages]=useState([]);
  const[loading,setLoading]=useState(false);

  const { getString } = useLocalization();

 //const datas=AsyncStorage.getItem('profile');

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
          getMessages();
          //alert(profile.token);
        }
      }catch(error){
        console.log(error);
      }
  
  }, [profile]);


  const getMessages = () => {
    setLoading(true);
    if (profile != null ){

      let request = {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'Authorization': 'Bearer '+profile.token
        }
      };
      console.log("Bearer "+profile.token)
  
      //alert(JSON.stringify(request));

      
      fetch(Environment.SERVER_API+"/api/Messaging/Get", request)
        .then(async response => {
          console.log(JSON.stringify(response, null, 4));
          //alert(response);
          return await response.json();
         
        })
        .then(responseJson => {
          //alert(JSON.stringify(responseJson));
          setMessages(responseJson);
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
<ScrollView style={styles.scrollContainer}>
{messages.map((item, index) => {
                  return (
                    <View key={index}>
                        <Text style={styles.inboxTitleText}>{item.title}</Text>

                        <Text style={styles.label_titleText}>{item.notification}</Text>
                        
                       


                        <View style={{flexDirection:"row"}}>
                      
                    <View style={{flex:1}}>
                   
                    </View>
                    <View style={{flex:1}}>
                    <Text style={styles.rightText}>{moment(item.created_at).format('LLL')}</Text>
                    </View>
                </View>

                {/* <View style={{flexDirection:"row"}}>
               
                    <View style={{flex:1}}>
                    
                        
                    </View>
                    <View style={{flex:1}}>
                    <Text style={styles.rightText}>From - {item.created_by_name}</Text>
                    </View>
                </View> */}
                        <Divider style={styles.divider} />
                      </View>
                  
                  );
                })}
</ScrollView>

   
    </View>
  );
};
