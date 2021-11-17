import React, { Component } from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import Navigation from "./components/Navigation";
import { prepareStore } from "./redux/store";

export default class App extends Component {
  render() {
    return (
      <Provider store={prepareStore()}>
        <Navigation />
      </Provider>
    );
  }
}
