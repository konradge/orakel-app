import React, { Component } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
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
      </Provider>
    );
  }
}
