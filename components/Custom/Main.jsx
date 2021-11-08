import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import GeneratorLayout from "../GeneratorLayout";
import Selector from "./Selector";
import { getData } from "./storage";
import { defaultListNames, defaultListValues } from "./defaultValues";

export default class Main extends Component {
  state = { selectedValue: 0, listNames: [], currentList: [] };
  componentDidMount() {
    this.loadListNames();
  }
  async updateCurrentList(newId) {
    let newCurrentList =
      (await getData(`custom_list/${newId}`)) || defaultListValues[newId];
    this.setState({ currentList: newCurrentList });
  }
  async loadListNames() {
    let listNames = await getData("custom_lists");
    if (listNames === null) listNames = defaultListNames;
    let currentList = await getData(
      `custom_lists/${listNames[this.state.selectedValue].id}`
    );
    if (currentList === null)
      currentList =
        defaultListValues[defaultListNames[this.state.selectedValue].id] || [];
    this.setState({ listNames, currentList });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <GeneratorLayout
          selection={
            <Selector
              onEditPress={this.props.startEditing}
              onSelect={(id) => this.updateCurrentList(id)}
              items={this.state.listNames}
              renderSelectedItem={(i) => (
                <Text style={styles.selectedItem}>{i}</Text>
              )}
            />
          }
          generatorFunction={() =>
            Math.floor(Math.random() * this.state.currentList.length)
          }
          outputComponents={this.state.currentList.map((val) => (
            <Text style={{ fontSize: 40 }}>{val}</Text>
          ))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedItem: { fontSize: 40 },
});
