import React, { useState, useRef,useEffect } from "react";
import { View, Text, StyleSheet,AsyncStorage } from "react-native";
import { Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { TouchableHighlight ,UpcomingAppoinmentRow} from "../../components";
import NavigationNames from "../../navigations/NavigationNames";
import { FabButton, Button } from "../../components/buttons";
import {
  globalAppointmentDate,
  globalAppointment
} from "../../services/DashboardService";
import { useLocalization } from "../../localization";
import { Theme } from "../../theme";
import {Environment} from "../../datas";

type IState = {
  selectedDate: string;
  items: any;
};

const weeklyAppointment = moment(globalAppointmentDate).format("YYYY-MM-DD");

/* const datas = {
  //[weeklyAppointment]: [{ date: weeklyAppointment, title: "" }]
  '2020-06-14': [{title: 'item 1 - any js object',date:'2020-06-14'},{title: 'item 2 - any js object',date:'2020-06-14'}],
  '2020-06-15': [{title: 'item 2 - any js object', date: '2020-06-14'}],
  '2012-05-24': [],
  '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
}; */

export const CalendarScreen: React.FC<{}> = props => {
  const refAgenda = useRef<Agenda>();
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [datas,setDatas]=useState({});
  const [role,setRole]=useState("");

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [items, setItems] = useState({});

  const onPressNewAppointment = () => {
    navigation.navigate(NavigationNames.NewAppointmentScreen);
  };

  useEffect(() => {

    if (profile != null){
      setRole(profile.role);
      getAppointments();
    }
  
  }, [profile]);

  useEffect(() => {
    async function load_profile() {
      let profile_state = await AsyncStorage.getItem('profile'); 
      setProfile(JSON.parse(profile_state));
      setRole(profile.role);
    }
   load_profile();
  
  }, []);

  const onPressToday = () => {
    const today = new Date();
    if (profile != null){
      getAppointments();
    }
    refAgenda.current.chooseDay(today);
  };

  const getAppointments = () => {
    let request = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Token': profile.token
      }
    };

    
    fetch(Environment.SERVER_API+"/api/appointment/GetAppointments", request)
      .then((response) => response.json())
      .then(responseJson => {

        setDatas({selectedDate:responseJson});

        setAppointments(responseJson);
        setLoading(false);

        //datas['2020-06-14']=appointments;

      })
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }



  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons>
        <Item title={getString("Today")} onPress={onPressToday} />
      </HeaderButtons>
    )
  });

  return (
    <View style={styles.container}>
      <Agenda 
        ref={refAgenda}
        items={items}
        loadItemsForMonth={month => {}}
        onCalendarToggled={calendarOpened => {}}
        onDayPress={day => {
          setSelectedDate(day.dateString);
          //getAppointments();
          setItems({ [day.dateString]: datas[day.dateString] });
        }}
        onDayChange={day => {}}
        selected={selectedDate}
        pastScrollRange={25}
        futureScrollRange={25}
        rowHasChanged={(r1, r2) => {
          return true;
        }}
        hideKnob={false}
        markedDates={{
          [weeklyAppointment]: {
            marked: true,
            dotColor: Theme.colors.primaryColor
          }
        }}
        onRefresh={() => {}}
        refreshing={false}
        refreshControl={null}
        theme={{
          agendaKnobColor: "#dcdcdc",
          selectedDayBackgroundColor: Theme.colors.primaryColor
        }}
        renderEmptyDate={() => {
          return <Text>-</Text>;
        }}
        renderDay={(day, item) => <View />}
        renderItem={(item, firstItemInDay) => {
          return (
            <TouchableHighlight  onPress={() =>
              navigation.navigate(NavigationNames.AppointmentScreen, {
                appointment: JSON.stringify(item),
              })
            }>
            <View style={{ marginVertical: 8 }}>
              {/* <CalendarItemRow
                style={styles.calendarItem}
                item={globalAppointment}
              /> */}
                               <UpcomingAppoinmentRow
        style={styles.upcomingAppoinmentRow}
        item={item} role={role}
      />
            </View>
            </TouchableHighlight>
          );
        }}
        renderEmptyData={() => {
          return (
            <View style={styles.emptyDataContainer}>
              <Ionicons name="ios-cafe" size={32} color={Theme.colors.black} />
              <Text style={styles.emptyDataTitle}>
                {getString("No Appointment today")}
              </Text>
              <View style={styles.emptyDataButtonContainer}>
              {role=="client" &&
 <Button
 title={getString("New Appointment")}
 type="outline"
 onPress={onPressNewAppointment}
/>
          }

               
              </View>
            </View>
          );
        }}
      />
      {role=="client" &&
      <FabButton onPress={onPressNewAppointment} style={styles.fabtuttonstyle} />
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Theme.colors.formBackground
  },
  infoText: {
    fontSize: 22,
    fontWeight: "600",
    paddingBottom: 12,
    marginTop: 8
  },
  calendarItem: {
    backgroundColor: "white",
    marginStart: 8,
    marginEnd: 8,
    shadowRadius: 2,
    shadowColor: "gray",
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  emptyDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyDataTitle: {
    color: Theme.colors.black,
    marginTop: 8,
    paddingHorizontal: 40,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "100"
  },
  emptyDataButtonContainer: {
    marginTop: 24
  },
  upcomingAppoinmentRow: {
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  fabtuttonstyle:{
      borderColor:Theme.colors.primaryColor,
      borderWidth:1,
      position: "absolute",
      bottom: 22,
      end: 20,
  }
});
