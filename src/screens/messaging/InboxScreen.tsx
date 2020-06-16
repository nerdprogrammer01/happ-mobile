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
                    <Text key={index} style={styles.minuteText}>{item.title}</Text>
                  );
                })}
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    height: 210,
    borderRadius: 16,
    borderWidth: 0.4,
    borderColor: Theme.colors.formBackground
  },
  liveContainer: {
    position: "absolute",
    start: 16,
    top: 16,
    backgroundColor: "#F93C1A",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  textRowContainer: {
    marginTop: 12,
    marginHorizontal: 4
  },
  liveText: { color: "white", fontSize: 13 },
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
  doctorContainer: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFFFFFEE",
    margin: 4,
    start: 0,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 12
  },
  doctorImage: {
    width: 28,
    height: 28,
    backgroundColor: Theme.colors.grayForBoxBackground,
    borderRadius: 8
  },
  doctorTextContainer: { paddingHorizontal: 4 },
  doctorNameText: {
    fontWeight: "600",
    fontSize: 12,
    color: Theme.colors.black
  },
  doctorTitleText: {
    fontSize: 11,
    color: Theme.colors.black
  },
  tagContainer: {
    backgroundColor: Theme.colors.grayForBoxBackground,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginEnd: 8
  },
  tagText: {
    fontWeight: "600",
    fontSize: 12,
    color: Theme.colors.black
  },
  horizontalDivider: { width: 12 },
  storyContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  storyItemContainer: {
    width: 68,
    height: 68,
    backgroundColor: Theme.colors.grayForBoxBackground,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Theme.colors.primaryColor
  },
  storyItemImage: { flex: 1, borderRadius: 100, margin: 2 }
});
