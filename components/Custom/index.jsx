import React, { Component } from "react";
import { Text, View } from "react-native";
import EditEntry from "./EditEntry";
import Main from "./Main";

const STATES = { MAIN: 0, EDIT: 1 };

export default class Custom extends Component {
  state = { currentState: 0, toEdit: "xyz" };
  render() {
    if (this.state.currentState == STATES.MAIN) {
      return (
        <Main
          startEditing={(id) =>
            this.setState({ currentState: STATES.EDIT, toEdit: id })
          }
        />
      );
    } else if (this.state.currentState == STATES.EDIT) {
      return (
        <EditEntry
          endEditing={(id) =>
            this.setState({ currentState: STATES.MAIN, toEdit: id })
          }
          toEdit={this.state.toEdit}
        />
      );
    }
  }
}
