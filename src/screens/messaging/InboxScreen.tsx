import React, { useState ,useEffect} from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,AsyncStorage
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
        }
      }catch(error){
        console.log(error);
      }
  
  }, [profile]);


  const getMessages = () => {
    if (profile != null ){

      let request = {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          //'Token': profile.token
          'Authorization': 'Bearer ' + profile.token
        }
      };
  
      console.log(profile.token);
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
          alert(error);
        });
    }else{
      //console.log(profile);
    }
   
    }

  return (
    <View style={styles.container}>

{messages.map((item, index) => {
                  return (
                    <View key={index}>
                        <Text style={styles.titleText}>{item.title}</Text>
                        <Text style={styles.minuteText}>From {item.created_by_name} on {item.created_at}</Text>

                        <Divider style={styles.divider} />
                      </View>
                  
                  );
                })}
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  item_container:{
    margin:5
  },
  titleText: {
    fontSize: 15,
    color: Theme.colors.black,
    marginTop: 8
  },
  minuteText: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.gray,
    marginTop: 4
  },
  divider: { marginStart: 16,marginEnd:16,backgroundColor:"#ADDFFF" },
});
