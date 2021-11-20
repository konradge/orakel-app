import React, { Component } from "react";
import { Text, View } from "react-native";
import EditEntry from "./EditEntry";
import Main from "./Main";
import { STATES } from "../../constants";
import { connect } from "react-redux";

class Custom extends Component {
  // componentDidMount() {
  //   this.loadLists();
  // }

  // componentWillUnmount() {
  //   this.storeLists();
  // }

  // /**
  //  * Setter for this.state._lists
  //  * @param {*} lists The lists to be stored
  //  */
  // async setLists(lists) {
  //   this.setState({ _lists: lists }, () => {
  //     this.storeLists();
  //   });
  // }

  // /**
  //  * Getter for this.state._lists
  //  * @returns Object containing all lists, that have been saved, where the key is the name of the list and the value an array of strings
  //  */
  // getLists() {
  //   return this.state._lists;
  // }

  // /**
  //  * Loads the object containing the lists to the state
  //  */
  // async loadLists() {
  //   // Gets all lists, that have been created
  //   //AsyncStorage.clear();
  //   let lists = (await getData("custom_lists")) || defaultLists;

  //   this.setLists(lists);
  // }

  // /**
  //  * Stores all lists, that are stored in the state, to the storage
  //  */
  // async storeLists() {
  //   if (this.getLists() == null) return;
  //   storeData("custom_lists", this.getLists());
  // }

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
