import React, { useState ,useEffect} from "react";
import { View, Text, Picker, StyleSheet, ActivityIndicator, TextInput, Platform } from 'react-native';
import { Theme } from "../../theme";
import { ButtonPrimary } from "../../components/buttons";
import { useLocalization } from "../../localization";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { NewAppointmentModel } from "../../models/NewAppointmentModel";
import {Environment} from "../../datas";

type TProps = {};

export const CreateAppointmentScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [appointmentType, setAppointmentType] = useState(0);
  const [appointmentCategory, setAppointmentCategory] = useState(0);
  const [appointmentActivity, setAppointmentActivity] = useState(0);
  const [appointment_types, setAppointmentTypes] = useState([]);
  const [appointment_categories, setAppointmentCategories] = useState([]);
  const [appointment_activities, setAppointmentActivities] = useState([]);
  const [loading,setLoading]=useState(true);

  const nextForm = () => {
    let appointment: NewAppointmentModel = {
      appointmentType: parseInt(appointmentType.toString()),
      appointmentCategory: parseInt(appointmentCategory.toString()),
      appointmentActivity: parseInt(appointmentActivity.toString())
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    }

    fetch(Environment.SERVER_API + "/api/clinician/GetClinicians", requestOptions)
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        navigation.navigate(NavigationNames.DoctorListScreen, { appointmentModel: JSON.stringify(appointment), doctors: JSON.stringify(data) });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  useEffect(() => {
   getAppointmentTypes();
  }, []);

  useEffect(() => {
    if (appointmentType > 0 && appointmentType != null){
      getAppointmentCategories();
    }
    
   }, [appointmentType]);

  
  const getAppointmentTypes = () => {
    setLoading(true);
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentTypes", request)
      .then((response) => response.json())
      .then(responseJson => {
        setAppointmentTypes(responseJson);
       setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getAppointmentCategories = () => {
    setLoading(true);
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentActivities?parent_id="+appointmentType, request)
      .then((response) =>{ 
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        setAppointmentCategories(responseJson);
       setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }


  const getAppointmentActivities = (appointment_cateogory_id:number) => {
    setLoading(true);
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        //'Token': profile.token
      }
    };

    fetch(Environment.SERVER_API+"/api/options/GetAppointmentSubActivities?parent_id="+appointment_cateogory_id, request)
      .then(async response => {
        console.log(JSON.stringify(response, null, 4));
        //alert(response);
        return await response.json();
        
      })
      .then(responseJson => {
        setAppointmentActivities(responseJson);
        setAppointmentCategory(appointment_cateogory_id);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
       
      });
  }

  return (
    <View style={styles.container}>
      {loading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />
                }

      <Text style={styles.titleText}>What type of appointment are you setting up?</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setAppointmentType(itemValue)} selectedValue={appointmentType}
        >
         
          { appointment_types.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        </Picker>
      </View>
      <Text style={styles.titleText}>What is the category of the appointment?</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => getAppointmentActivities(itemValue)} selectedValue={appointmentCategory}
        >
           { appointment_categories.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        
        </Picker>
      </View>
      <Text style={styles.titleText}>Please specify the activity for the appointment</Text>
      <View style={styles.pickerstyle}>
        <Picker
          onValueChange={(itemValue, itemIndex) => setAppointmentActivity(itemValue)} selectedValue={appointmentActivity}
        >
           { appointment_activities.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
        
        </Picker>
      </View>
      <ButtonPrimary
        title={getString("Continue")}
        onPress={nextForm}
        type="outline"
        style={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingLeft: 10
  },
  titleText: {
    fontSize: 17,
    fontWeight: "600",
    color: Theme.colors.black,
    paddingTop: 20
  },
  pickerstyle: {
    height: 50,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: Theme.colors.primaryColor,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  buttonStyle: {
    marginTop: 20,
    marginRight: 10,
    alignSelf: 'stretch',
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: 50,
    padding: 10,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 5,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 1,
  }
});