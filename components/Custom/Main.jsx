import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import GeneratorLayout from "../GeneratorLayout";
import Selector from "./Selector";
import { connect } from "react-redux";
import { setCustomSectionState } from "../../redux/currentState";

class Main extends Component {
  render() {
    console.log("SELECTED: " + this.props.selectedList);
    console.log(this.props.lists);
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
              listNames={this.props.listNames}
              renderSelectedItem={(name) => (
                <Text style={styles.selectedItem}>{name}</Text>
              )}
            />
          }
          emptyText="Die ausgewählte Liste ist leer"
          generatorFunction={() =>
            Math.floor(
              Math.random() *
                this.props.lists[this.props.selectedList].list.length
            )
          }
          outputComponents={this.props.lists[this.props.selectedList].list.map(
            (val) => (
              <Text style={{ fontSize: 40 }} numberOfLines={1}>
                {val}
              </Text>
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

export default connect(
  ({ currentState, lists }) => {
    return { selectedList: currentState.selectedList, lists };
  },
  { setCustomSectionState }
)(Main);
