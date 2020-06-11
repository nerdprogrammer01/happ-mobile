import { Spinner } from "native-base";
import * as React from "react";
import { Component } from "react";
import { StyleSheet, View } from "react-native";
//import WindowDimensions from "./WindowDimensions";

export default class Loader extends Component {
  public render() {
    return (
      <View style={style.spinner}>
        <Spinner color="white" />
      </View>
    );
  }
}

const style = StyleSheet.create({
  spinner: {
    backgroundColor: "rgba(0, 0, 0, .8)",
    borderRadius: 5,
    position: "absolute",
    width: 80,
    zIndex: 1000,
  },
});