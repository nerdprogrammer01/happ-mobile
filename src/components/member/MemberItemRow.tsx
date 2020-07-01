import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { MemberModel } from "../../models";
import { Avatar } from "../avatar";
import { Theme } from "../../theme";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import { DoctorDetailsBottomSheet } from "../../modals";
import {Environment} from "../../datas";

type TProps = {
  item: MemberModel;
  style?: ViewStyle;
};

export const MemberItemRow: React.FC<TProps> = props => {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <>
      <View style={[styles.container, props.style]}>
        <Avatar
          source={{
            uri:  Environment.SERVER_API+ props.item.imageUrl
          }}
          style={styles.avatar}
        />
        <View style={styles.textContent}>
          <Text style={styles.doctorNameText}>{props.item.fullName}</Text>
          <Text style={styles.doctorTitleText}>{props.item.title}</Text>
       
        </View>
       
      </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 5
  },
  avatar: { alignSelf: "center" },
  textContent: { flex: 1, paddingHorizontal: 14 },
  doctorNameText: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.black,
    marginTop:5
  },
  doctorTitleText: {
    marginTop: 4,
    color: Theme.colors.gray,
    fontSize: 13
  },
  moreButton: {
    paddingHorizontal: 16,
    paddingVertical: 2,
    alignSelf: "flex-start"
  }
});
