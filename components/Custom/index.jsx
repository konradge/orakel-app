import React, { Component } from "react";
import { Text, View } from "react-native";
import EditEntry from "./EditEntry";
import Main from "./Main";
import { STATES } from "../../constants";
import { connect } from "react-redux";

class Custom extends Component {
  render() {
    if (this.props.sectionState == STATES.MAIN) {
      return (
        // Main-Page
        <Main />
      );
    } else if (this.props.sectionState == STATES.EDIT) {
      return (
        // Edit page: After having selected a list to edit on the main page, the entries can be edited here
        <EditEntry />
      );
    }
  }
}

export default connect(({ currentState, lists }) => {
  return { sectionState: currentState.customSectionState };
})(Custom);
