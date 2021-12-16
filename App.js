import React, { Component } from "react";
import { Button, KeyboardAvoidingView, Text, View } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Provider } from "react-redux";
import Navigation from "./components/Navigation";
import { prepareStore } from "./redux/store";

export default class App extends Component {
  render() {
    return (
      <Provider store={prepareStore()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Navigation />
        </KeyboardAvoidingView>
        <FlashMessage position="top" />
      </Provider>
    );
  }
}
