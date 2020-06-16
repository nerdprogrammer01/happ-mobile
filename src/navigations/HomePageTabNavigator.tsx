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
  NewAppointmentScreen,
  DoctorListScreen,
  DoctorDetailScreen,
  EventListScreen,
  MemberProfileScreen,
  CreateAppointmentScreen,
  AppointmentsScreen,
  LoginScreen,
  RegisterScreen,
  AppointmentScreen,
  InboxScreen
} from "../screens";
import { ToolbarBrandLogo } from "../components";

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
        options={{ title: getString("Doctors") }}
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
        name={NavigationNames.NewAppointmentScreen}
        component={NewAppointmentScreen}
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
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.DoctorListScreen}
        component={DoctorDetailScreen}
        options={{ headerShown: false }}
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
        initialRouteName={NavigationNames.LoginTab}  screenOptions={{
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
