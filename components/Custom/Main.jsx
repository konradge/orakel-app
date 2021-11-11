import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import GeneratorLayout from "../GeneratorLayout";
import Selector from "./Selector";
import { defaultListNames, defaultListValues } from "./defaultValues";

export default class Main extends Component {
  state = { selectedList: "jahreszeiten" };
  render() {
    console.log(this.props.listNames);
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
              onSelect={(selectedList) => this.setState({ selectedList })}
              listNames={this.props.listNames}
              renderSelectedItem={(name) => (
                <Text style={styles.selectedItem}>{name}</Text>
              )}
              selectedList={this.state.selectedList}
            />
          }
          generatorFunction={() =>
            Math.floor(
              Math.random() * this.props.lists[this.state.selectedList].length
            )
          }
          outputComponents={this.props.lists[this.state.selectedList].map(
            (val) => (
              <Text style={{ fontSize: 40 }}>{val}</Text>
            )
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedItem: { fontSize: 40 },
});
