import React from "react";
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Theme } from "../../theme";

type TProps = {
  title: string;
  style?: ViewStyle;
  type?: "default" | "outline";
  size?: "default" | "small";
  onPress?: () => void;
};

export const ButtonPrimary: React.FC<TProps> = props => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.style,
        props.type === "outline" && styles.outlineContainer
      ]}
      onPress={props.onPress}
    >
      <Text
        style={[
          styles.text,
          props.type === "outline" && styles.outlineText,
          props.size === "small" && {
            fontSize: 12
          }
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: Theme.colors.primaryColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  outlineContainer: {
    backgroundColor: Theme.colors.primaryColor,
    borderWidth: 0.5,
    borderColor: Theme.colors.primaryColor
  },
  text: { fontWeight: "600", fontSize: 15, color: "white" },
  outlineText: {
    color: "white",
    fontWeight: "400"
  }
});
