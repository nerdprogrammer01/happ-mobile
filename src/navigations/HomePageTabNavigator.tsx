import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Theme } from "../theme";
import NavigationNames from "./NavigationNames";
import { useLocalization } from "../localization";
import { stackScreenOptions, tabScreenOptions } from "./NavigationHelper";
import {
  HomeScreen,
  ProfileScreen,
  MenuScreen,
  CalendarScreen,
  MediaScreen,
  CampaignListScreen,
  CampaignDetailScreen,
  DepartmentListScreen,
  DepartmentDetailScreen,
  MediaDetailScreen,
  DoctorListScreen,
  DoctorDetailScreen,
  EventListScreen,
  MemberProfileScreen,
  CreateAppointmentScreen,
  AppointmentsScreen,
  LoginScreen,
  RegisterScreen,
  RegisterContScreen,
  AppointmentScreen,
  InboxScreen,
  ConfirmAppointmentScreen,
  PrescriptionsScreen,
  NewPrescriptionScreen,
  MemberSearchScreen,
  PrescriptionScreen,
  ReferralScreen,
  ReferralsScreen,
  NewReferralScreen,
  ProviderAvailabilityScreen,
  ServiceCostScreen,
  EditProfileScreen,
  BankInfoScreen,
  HMOScreen,
  SettingsScreen,
  FamilyIntakeScreen,
  ProviderDetailScreen,
  PrimaryCareScreen,
  ProgressNoteScreen,
  PsychiatricProgressScreen,
  PediatricEvaluationScreen

} from "../screens";
import { ToolbarBrandLogo } from "../components";
import VideoConferenceScreen from "../screens/video";
import { ProvidersListScreen } from "../screens/providers/ProvidersListScreen";
import { AppointmentPaymentScreen } from "../screens/payment";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name={NavigationNames.LoginScreen}
        component={LoginScreen}
      />
      <Stack.Screen
        name={NavigationNames.RegisterScreen}
        component={RegisterScreen}
      /*     options={{ headerShown: false }} */
      />
      <Stack.Screen
        name={NavigationNames.RegisterContScreen}
        component={RegisterContScreen}
      /*     options={{ headerShown: false }} */
      />
    </Stack.Navigator>
  );
};

const HomeTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.MemberProfileScreen}
        component={MemberProfileScreen}
        options={{ title: getString("My Profile") }}
      />
      <Stack.Screen
        name={NavigationNames.EditProfileScreen}
        component={EditProfileScreen}
        options={{ title: getString("Edit Profile") }}
      />
      <Stack.Screen
        name={NavigationNames.HomeScreen}
        component={HomeScreen}
        options={{ headerTitle: () => <ToolbarBrandLogo /> }}
      />
      <Stack.Screen
        name={NavigationNames.CampaignListScreen}
        component={CampaignListScreen}
        options={{ title: getString("Campaigns") }}
      />
      <Stack.Screen
        name={NavigationNames.CampaignDetailScreen}
        component={CampaignDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.DepartmentListScreen}
        component={DepartmentListScreen}
        options={{ title: getString("Our Departments") }}
      />
      <Stack.Screen
        name={NavigationNames.DepartmentDetailScreen}
        component={DepartmentDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.CreateAppointmentScreen}
        component={CreateAppointmentScreen}
        options={{ title: getString("New Appointment") }}
      />
      <Stack.Screen
        name={NavigationNames.DoctorListScreen}
        component={DoctorListScreen}
        options={{ title: getString("Providers") }}
      />
      <Stack.Screen
        name={NavigationNames.DoctorDetailScreen}
        component={DoctorDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.ConfirmAppointmentScreen}
        component={ConfirmAppointmentScreen}
        options={{ title: getString("Book Appointment") }}
      />
      <Stack.Screen
        name={NavigationNames.AppointmentPaymentScreen}
        component={AppointmentPaymentScreen}
        options={{ title: getString("Complete Payment") }}
      />
      <Stack.Screen
        name={NavigationNames.AppointmentScreen}
        component={AppointmentScreen}
        options={{ title: getString("Appointment Details") }}
      />
             <Stack.Screen
        name={NavigationNames.VideoConferenceScreen}
        component={VideoConferenceScreen}
        options={{ title: getString("Video Session") }}
      />


<Stack.Screen
        name={NavigationNames.FamilyIntakeScreen}
        component={FamilyIntakeScreen}
        options={{ title: getString("Family Intake") }}
      />

<Stack.Screen
        name={NavigationNames.ProgressNoteScreen}
        component={ProgressNoteScreen}
        options={{ title: getString("Progress Note") }}
      />

<Stack.Screen
        name={NavigationNames.PrimaryCareScreen}
        component={PrimaryCareScreen}
        options={{ title: getString("Primary Care") }}
      />

<Stack.Screen
        name={NavigationNames.PediatricEvaluationScreen}
        component={PediatricEvaluationScreen}
        options={{ title: getString("Pediatric Evaluation") }}
      />

<Stack.Screen
        name={NavigationNames.PsychiatricProgressScreen}
        component={PsychiatricProgressScreen}
        options={{ title: getString("Psychiatrist Progress Note") }}
      />

    </Stack.Navigator>
  );
};

const CalendarTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.CalendarScreen}
        component={CalendarScreen}
        options={{ title: getString("Calendar") }}
      />
      <Stack.Screen
        name={NavigationNames.CreateAppointmentScreen}
        component={CreateAppointmentScreen}
        options={{ title: getString("New Appointment") }}
      />
      <Stack.Screen
        name={NavigationNames.DoctorDetailScreen}
        component={DoctorDetailScreen}
      />

      <Stack.Screen
        name={NavigationNames.AppointmentScreen}
        component={AppointmentScreen}
        options={{ title: getString("Appointment Details") }}
      />

      <Stack.Screen
        name={NavigationNames.VideoConferenceScreen}
        component={VideoConferenceScreen}
        options={{ title: getString("Video Session") }}
      />


    <Stack.Screen
        name={NavigationNames.FamilyIntakeScreen}
        component={FamilyIntakeScreen}
        options={{ title: getString("Family Intake") }}
      />

<Stack.Screen
        name={NavigationNames.ProgressNoteScreen}
        component={ProgressNoteScreen}
        options={{ title: getString("Progress Note") }}
      />

<Stack.Screen
        name={NavigationNames.PrimaryCareScreen}
        component={PrimaryCareScreen}
        options={{ title: getString("Primary Care") }}
      />

<Stack.Screen
        name={NavigationNames.PediatricEvaluationScreen}
        component={PediatricEvaluationScreen}
        options={{ title: getString("Pediatric Evaluation") }}
      />

<Stack.Screen
        name={NavigationNames.PsychiatricProgressScreen}
        component={PsychiatricProgressScreen}
        options={{ title: getString("Psychiatrist Progress Note") }}
      />

    </Stack.Navigator>
  );
};

const MediaTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.MediaScreen}
        component={MediaScreen}
        options={{ title: getString("Media") }}
      />
      <Stack.Screen
        name={NavigationNames.MediaDetailScreen}
        component={MediaDetailScreen}
        options={{ title: getString("Media") }}
      />
    </Stack.Navigator>
  );
};

const ProfileTabStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.ProfileScreen}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const DoctorTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>



      <Stack.Screen
        name={NavigationNames.ProvidersListScreen}
        component={ProvidersListScreen}
        options={{ title: "Providers" }}
      />

    <Stack.Screen
        name={NavigationNames.ProviderDetailScreen}
        component={ProviderDetailScreen}
        options={{ headerShown: true }}
      />



    </Stack.Navigator>
  );
};

const MyAppointmentsTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.AppointmentsScreen}
        component={AppointmentsScreen}
        options={{ title: getString("My Appointments") }}
      />
      <Stack.Screen
        name={NavigationNames.CreateAppointmentScreen}
        component={CreateAppointmentScreen}
        options={{ title: getString("New Appointment") }}
      />
      <Stack.Screen
        name={NavigationNames.AppointmentScreen}
        component={AppointmentScreen}
        options={{ title: getString("Appointment") }}
      />
    </Stack.Navigator>
  );
};

const MessageTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.InboxScreen}
        component={InboxScreen}
        options={{ title: getString("My Inbox") }}
      />

      <Stack.Screen
        name={NavigationNames.ConfirmAppointmentScreen}
        component={ConfirmAppointmentScreen}
        options={{ title: getString("Confirm Appointment") }}
      />
    </Stack.Navigator>
  );
};

const MenuTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.MenuScreen}
        component={MenuScreen}
        options={{ title: getString("Menu") }}
      />
      <Stack.Screen
        name={NavigationNames.EventListScreen}
        component={EventListScreen}
        options={{ title: getString("Events") }}
      />
      <Stack.Screen
        name={NavigationNames.MemberProfileScreen}
        component={MemberProfileScreen}
        options={{ title: getString("Profile Member") }}
      />
      <Stack.Screen
        name={NavigationNames.CreateAppointmentScreen}
        component={CreateAppointmentScreen}
        options={{ title: getString("Create New Appointment") }}
      />
      <Stack.Screen
        name={NavigationNames.AppointmentsScreen}
        component={AppointmentsScreen}
        options={{ title: getString("My Appointments") }}
      />
      <Stack.Screen
        name={NavigationNames.PrescriptionsScreen}
        component={PrescriptionsScreen}
        options={{ title: getString("Prescriptions") }}
      />
         <Stack.Screen
        name={NavigationNames.PrescriptionScreen}
        component={PrescriptionScreen}
        options={{ title: getString("Prescriptions") }}
      />
      <Stack.Screen
        name={NavigationNames.NewPrescriptionScreen}
        component={NewPrescriptionScreen}
        options={{ title: getString("New Prescriptions") }}
      />


    <Stack.Screen
        name={NavigationNames.MemberSearchScreen}
        component={MemberSearchScreen}
        options={{ title: getString("Select Members") }}
      />

    <Stack.Screen
        name={NavigationNames.ReferralsScreen}
        component={ReferralsScreen}
        options={{ title: getString("Referrals") }}
      />

    <Stack.Screen
        name={NavigationNames.ReferralScreen}
        component={ReferralScreen}
        options={{ title: getString("Referral") }}
      />

    <Stack.Screen
        name={NavigationNames.NewReferralScreen}
        component={NewReferralScreen}
        options={{ title: getString("New Referral") }}
      />

<Stack.Screen
        name={NavigationNames.ProviderAvailabilityScreen}
        component={ProviderAvailabilityScreen}
        options={{ title: getString("My Availability") }}
      />

      
<Stack.Screen
        name={NavigationNames.ServiceCostScreen}
        component={ServiceCostScreen}
        options={{ title: getString("My Service Costs") }}
      />

<Stack.Screen
        name={NavigationNames.BankInfoScreen}
        component={BankInfoScreen}
        options={{ title: getString("My Bank Information") }}
      />

      
<Stack.Screen
        name={NavigationNames.HMOScreen}
        component={HMOScreen}
        options={{ title: getString("My HMO") }}
      />

<Stack.Screen
        name={NavigationNames.SettingsScreen}
        component={SettingsScreen}
        options={{ title: getString("Account Settings") }}
      />

      {/* <Stack.Screen
        name={NavigationNames.AppointmentScreen}
        component={AppointmentScreen}
        options={{ title: getString("Appointment") }}
      /> */}
    </Stack.Navigator>
  );
};

const HomePageTabNavigator = () => (
  <Tab.Navigator
    screenOptions={tabScreenOptions}
    tabBarOptions={{
      activeTintColor: Theme.colors.primaryColor,
      inactiveTintColor: Theme.colors.gray
    }}
  >
    <Tab.Screen name={NavigationNames.HomeTab} component={HomeTabStack} />
    <Tab.Screen name={NavigationNames.CalendarTab} component={CalendarTabStack} />
    <Tab.Screen name={NavigationNames.DoctorTab} component={DoctorTabStack} />
    {/* <Tab.Screen name={NavigationNames.AppointmentsTab} component={MyAppointmentsTabStack} /> */}
    {/* <Tab.Screen name={NavigationNames.MediaTab} component={MediaTabStack} /> */}
    <Tab.Screen name={NavigationNames.MessageTab} component={MessageTabStack} />
    <Tab.Screen name={NavigationNames.MenuTab} component={MenuTabStack} />
    {/* <Tab.Screen name={NavigationNames.ProfileTab} component={ProfileTabStack} /> */}
  </Tab.Navigator>
);

function MainStackNavigator() {
  return (

    <Stack.Navigator
      initialRouteName={NavigationNames.LoginTab} screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name={NavigationNames.LoginTab} component={LoginTabStack}

      />
      <Stack.Screen
        name='Home'
        component={HomePageTabNavigator}

      />

    </Stack.Navigator>

  )
}

export default MainStackNavigator;
