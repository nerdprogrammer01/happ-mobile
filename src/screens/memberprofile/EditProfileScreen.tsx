import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, AsyncStorage } from "react-native";
import { Theme } from "../../theme";
import { useLocalization } from "../../localization";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { Button } from "../../components/buttons";
import { Environment } from "../../datas";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "native-base";

type TProps = {};

export const EditProfileScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load_profile() {
      let profile = await AsyncStorage.getItem('profile')
        .then((data) => {
          setProfile(JSON.parse(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    load_profile();
  }, []);

  return (
    <SafeAreaView style={styles.flex1}>
      <ScrollView
        style={styles.flex1}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={profile.first_name}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={profile.last_name}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={profile.phone}
        />
        <Text style={styles.label}>Preferred Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Preferred Name"
          value={profile.preferred_name}
        />
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={profile.dob}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={profile.address}
        />
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          value={profile.city}
        />
        <Text style={styles.label}>State</Text>
        <View style={styles.pickerstyle}>
          <Picker>
            <Picker.Item label="Select State" value={0} />
            <Picker.Item label="FCT" value={1} />
          </Picker>
        </View>
        <Text style={styles.label}>Country</Text>
        <View style={styles.pickerstyle}>
          <Picker>
            <Picker.Item label="Select Country" value={0} />
            <Picker.Item label="Nigeria" value={1} />
          </Picker>
        </View>
        <Text style={styles.label}>Marital Status</Text>
        <View style={styles.pickerstyle}>
          <Picker>
            <Picker.Item label="Select Marital Status" value={0} />
            <Picker.Item label="Single" value={1} />
          </Picker>
        </View>
        <Text style={styles.label}>Education Level</Text>
        <View style={styles.pickerstyle}>
          <Picker>
            <Picker.Item label="Select Education Level" value={0} />
            <Picker.Item label="Master's" value={1} />
          </Picker>
        </View>
        <Button
          title={getString("Update Profile")}
          type="outline"
          style={styles.buttonStyle}
        />
      </ScrollView>
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
