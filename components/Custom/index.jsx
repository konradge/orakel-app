import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { defaultLists } from "./defaultValues";
import EditEntry from "./EditEntry";
import Main from "./Main";
import { getData, storeData } from "./storage";

const STATES = { MAIN: 0, EDIT: 1 };

export default class Custom extends Component {
  state = {
    /* State of this App-part, either STATES.MAIN or STATES.EDIT */
    currentState: STATES.MAIN,
    // Key of the list, that should be edited
    toEdit: "jahreszeiten",
    _lists: null,
  };

  componentDidMount() {
    this.loadLists();
  }

  componentWillUnmount() {
    this.storeLists();
  }

  /**
   * Setter for this.state._lists
   * @param {*} lists The lists to be stored
   */
  async setLists(lists) {
    this.setState({ _lists: lists }, () => {
      this.storeLists();
    });
  }

  /**
   * Getter for this.state._lists
   * @returns Object containing all lists, that have been saved, where the key is the name of the list and the value an array of strings
   */
  getLists() {
    return this.state._lists;
  }

  /**
   * Loads the object containing the lists to the state
   */
  async loadLists() {
    // Gets all lists, that have been created
    //AsyncStorage.clear();
    let lists = (await getData("custom_lists")) || defaultLists;

    this.setLists(lists);
  }

  /**
   * Stores all lists, that are stored in the state, to the storage
   */
  async storeLists() {
    if (this.getLists() == null) return;
    storeData("custom_lists", this.getLists());
  }

  render() {
    if (this.getLists() === null) {
      return <Text>Loading...</Text>;
    } else if (this.state.currentState == STATES.MAIN) {
      return (
        // Main-Page
        <Main
          listNames={Object.keys(this.getLists() || {})}
          lists={this.getLists()}
          startEditing={(toEdit) =>
            this.setState({ toEdit, currentState: STATES.EDIT })
          }
        />
      );
    } else if (this.state.currentState == STATES.EDIT) {
      return (
        // Edit page: After having selected a list to edit on the main page, the entries can be edited here
        <EditEntry
          onSave={(updatedList, key) => {
            let lists = this.getLists();
            lists[key] = updatedList;
            this.setLists(lists);
            this.setState({ currentState: STATES.MAIN });
          }}
          onAbort={() => this.setState({ currentState: STATES.MAIN })}
          title={this.state.toEdit}
          list={this.getLists()[this.state.toEdit]}
        />
      );
    }
  }
}
