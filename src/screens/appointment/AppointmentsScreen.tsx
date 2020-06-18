import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UpcomingAppoinmentRow,
  FabButton,
} from "../../components";
import { DashboardItemsModel } from "../../models";
import { DashboardService } from "../../services";
import { useLocalization } from "../../localization";
import NavigationNames from "../../navigations/NavigationNames";
import { Theme } from "../../theme";

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

  const onPressNewAppointment = () => {
    navigation.navigate(NavigationNames.CreateAppointmentScreen);
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
      <UpcomingAppoinmentRow role=""
        style={styles.upcomingAppoinmentRow}
        item={dashboardItem.appointment}
      />  
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
