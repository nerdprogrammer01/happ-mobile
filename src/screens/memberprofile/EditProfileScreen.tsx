import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, AsyncStorage,ActivityIndicator } from "react-native";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { Button } from "../../components/buttons";
import { Environment } from "../../datas";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "native-base";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type TProps = {};

export const EditProfileScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [educactionLevels, setEducationLevels] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(0);  
  const [country, setCountry] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState(0);  
  const [educationLevel, setEducationLevel] = useState(0);
  const [isLoading,setLoading]=useState(true);
  

  const getSelectData = () => {
    setLoading(true);
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      }
    };
    
    fetch(Environment.SERVER_API+"/api/appdata/GetProfileSelectData", request)
      .then((response) => response.json())
      .then(responseJson => {
        setStates(responseJson.states)
        setCountries(responseJson.countries)
        setMaritalStatuses(responseJson.marital_statuses)
        setEducationLevels(responseJson.education_levels)
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    async function load_profile() {
      setLoading(true);
     let profile = await AsyncStorage.getItem('profile')
        .then((data) => {
          
          setProfile(JSON.parse(data));
          setFirstName(JSON.parse(data).first_name)
          setLastName(JSON.parse(data).last_name)
          setPhone(JSON.parse(data).phone)
          setPreferredName(JSON.parse(data).preferred_name)
          setDob(moment(JSON.parse(data).dob).format('DD-MM-YYYY'))
          setAddress(JSON.parse(data).address)
          setCity(JSON.parse(data).city)
          setState(JSON.parse(data).state)
          setCountry(JSON.parse(data).country)
          setMaritalStatus(JSON.parse(data).marital_status)
          setEducationLevel(JSON.parse(data).education_level);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    load_profile();
  }, []);

  useEffect(() => {
   getSelectData()
  }, [])

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    let datestring = moment(date).format('DD-MM-YYYY')
    setDob(datestring);
    hideDatePicker();
  };

  const updateProfile = () => {
    console.log(dob)
    
    let requestBody = JSON.stringify({
      id: profile.id,
      role:profile.role,
      first_name:firstName,
      last_name:lastName,
      phone:phone,
      preferred_name:preferredName,
      dob:moment(dob.trim()+' 01:01:01','DD-MM-YYYY hh:mm:ss').format(),
      address:address,
      country:country,
      state:state,
      city:city,
      marital_status:maritalStatus,
      education_level:educationLevel,
      created_at : new Date(),
    });

    console.log(requestBody)

    let request = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer '+profile.token
      },
      body:requestBody
    };

    fetch(Environment.SERVER_API + "/api/profile/UpdateProfile", request)
      .then((response) => {
        JSON.stringify(response, null, 4)
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson)
        if(responseJson === 200){
          alert('Successfully Updated Profile')
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={styles.flex1}>
  {isLoading &&
                    <ActivityIndicator size='large' color={Theme.colors.primaryColor} />}

              {profile != null && (
                  <ScrollView
                  style={styles.flex1}
                  contentContainerStyle={styles.scrollContainer}
                >
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(inputValue) => setFirstName(inputValue)}

                  />
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(inputValue) => setLastName(inputValue)}
                  />
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={(inputValue) => setPhone(inputValue)}
                  />
                  <Text style={styles.label}>Preferred Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Preferred Name"
                    value={preferredName}
                    onChangeText={(inputValue) => setPreferredName(inputValue)}
                  />
                  <Text style={styles.label}>Date of Birth</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Date of Birth"
                    value={dob}
                    pointerEvents="none"
                    onTouchStart={showDatePicker}
        
                  />
                    <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={(inputValue) => setAddress(inputValue)}
                  />
                  <Text style={styles.label}>City</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={city}
                    onChangeText={(inputValue) => setCity(inputValue)}
                  />

                  <Text style={styles.label}>State</Text>
                  <View style={styles.pickerstyle}>
                    <Picker onValueChange={(value) => {setState(value)}} selectedValue={state}>
                      <Picker.Item label="Select State" value={0} />
                      {states != null && states.map((item, key)=>(
            <Picker.Item label={item.name} value={item.id} key={key} />)
            )}
                                </Picker>
                  </View>
                  <Text style={styles.label}>Country</Text>
                  <View style={styles.pickerstyle}>
                    <Picker onValueChange={(value) => {setCountry(value)}} selectedValue={country}>
                    <Picker.Item label="Select Country" value={0} />
                      {
                        countries.map((item, key)=>(
                          <Picker.Item label={item.name} value={item.id} key={key} />)
                          )}
                    </Picker>
                  </View>
                  <Text style={styles.label}>Marital Status</Text>
                  <View style={styles.pickerstyle}>
                    <Picker onValueChange={(value) => {setMaritalStatus(value)}} selectedValue={maritalStatus}>
                      <Picker.Item label="Select Marital Status" value={0} />
                      {
                        maritalStatuses.map((item, key)=>(
                          <Picker.Item label={item.value} value={item.id} key={key} />)
                          )}
                    </Picker>
                  </View>
                  <Text style={styles.label}>Education Level</Text>
                  <View style={styles.pickerstyle}>
                    <Picker onValueChange={(value) => {setEducationLevel(value)}} selectedValue={educationLevel}>
                      <Picker.Item label="Select Education Level" value={0} />
                      {
                        educactionLevels.map((item, key)=>(
                          <Picker.Item label={item.value} value={item.id} key={key} />)
                          )}
                    </Picker>
                  </View>
                  <Button
                    title={getString("Update Profile")}
                    type="outline"
                    style={styles.buttonStyle}
                    onPress={updateProfile}
                  />
                </ScrollView>
              )}
    
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 16 },
  input: {
    height: 50,
    width: '90%',
    borderRadius: 10,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center"
  },
  label: {
    fontSize: 16, padding: 10, marginLeft: 10
  },
  pickerstyle: {
    height: 50,
    alignSelf: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: Theme.colors.primaryColor,
    borderRadius: 5
  }, buttonStyle: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    fontSize: 20,
  },
});
