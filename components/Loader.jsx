import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default class Loader extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
}
