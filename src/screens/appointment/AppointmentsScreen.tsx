import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UpcomingAppoinmentRow,
  DashboardMenuItemRow,
  Divider,
  SectionHeader,
  DashboardCampaignsListItem,
  DoctorItemRow,
  FabButton,
  TouchableHighlight
} from "../../components";
import { DashboardItemsModel } from "../../models";
import { DashboardService } from "../../services";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { HomeMenuItemType } from "../../types";
import { Theme } from "../../theme";

const generateMenuItems = (
  getString: (key: string) => string
): HomeMenuItemType[] => [
  {
    row1: getString("Book an Appoinment"),
    row2: getString("6 Doctors are available"),
    iconName: "md-alarm",
    iconBack: "#73CEC1",
    action: "BookAnAppoinment"
  },
  {
    row1: getString("Lab Tests at Home"),
    row2: getString("92 Diagnostics are available"),
    iconName: "ios-flask",
    iconBack: "#35CDF7",
    action: "LabTestsAtHome"
  },
  {
    row1: getString("Online Healt Consultant"),
    row2: getString("+14 Consultants"),
    iconName: "ios-text",
    iconBack: "#FA7F5D",
    action: "OnlineHealtConsultant"
  }
];

type TProps = {};

export const AppointmentsScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  const { getString, changeLanguage } = useLocalization();
  const [dashboardItem, setDashboardItem] = useState<DashboardItemsModel>(null);

  useEffect(() => {
    DashboardService.getDashboardItems().then(item => {
      setDashboardItem(item);
    });
  }, []);

  const onClickMenu = (item: HomeMenuItemType) => {
    switch (item.action) {
      case "BookAnAppoinment":
        navigation.navigate(NavigationNames.NewAppointmentScreen);
        break;
      case "LabTestsAtHome":
        //navigation.navigate(NavigationName);
        break;
      case "OnlineHealtConsultant":
        //navigation.navigate(NavigationName);
        break;
    }
  };

  const onPressNewAppointment = () => {
    navigation.navigate(NavigationNames.NewAppointmentScreen);
  };

  if (dashboardItem === null) {
    return <Text>Loading</Text>;
  }

  return (
      <View style={styles.maincontainer}>
           <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
   {/*    <UpcomingAppoinmentRow
        style={styles.upcomingAppoinmentRow}
        item={dashboardItem.appointment}
      /> */}
  
      <FlatList
        data={generateMenuItems(getString)}
        keyExtractor={(item, index) => `key${index}ForMenu`}
        renderItem={row => (
          <TouchableHighlight onPress={() => onClickMenu(row.item)}>
            {/* <DashboardMenuItemRow item={row.item} /> */}
            <UpcomingAppoinmentRow
        style={styles.upcomingAppoinmentRow}
        item={dashboardItem.appointment}
      />
          </TouchableHighlight>
        )}
        // ItemSeparatorComponent={() => <Divider h16 />}
        scrollEnabled={true}
      />
    {/*   <SectionHeader
        title={getString("New Campaigns")}
        rightTitle={getString("See More")}
        rightAction={() =>
          navigation.navigate(NavigationNames.CampaignListScreen)
        }
      /> */}
   
  
    </ScrollView>
    <FabButton style={styles.fabtuttonstyle} onPress={onPressNewAppointment} />
      </View>
   
  );
};

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1
      },
  container: { paddingVertical: 24 },
  upcomingAppoinmentRow: {
    marginHorizontal: 16,
    margin:10,
  
  },
  touchableDoctorItem: {
    paddingStart: 16,
    paddingEnd: 8
  },
  campaignsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  departmentsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  horizontalDivider: { width: 12 },
  fabtuttonstyle:{
      borderColor:Theme.colors.primaryColor,
      borderWidth:1
  }
});
