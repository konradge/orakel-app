import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import SetNumberRange from "./SetNumberRange";
import DeleteData from "./DeleteData";
import SetDecisionTime from "./SetDecisionTime";
class Settings extends Component {
  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}
      >
        <DeleteData
          trigger={<Trigger title="App zurücksetzen" iconName="trash" />}
        />
        <SetNumberRange
          trigger={<Trigger title="Zahlenbereich setzen" iconName="sliders" />}
        />
        <SetDecisionTime
          trigger={
            <Trigger
              title="Entscheidungszeit setzen"
              iconName="hourglass"
              lastTrigger
            />
          }
          iconName="clock"
        />
      </View>
    );
  }
}

const Trigger = ({ title, iconName, lastTrigger }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderColor: "grey",
        borderWidth: 1,
        backgroundColor: "lightgrey",
        padding: 5,
        margin: 2,
        width: Dimensions.get("window").width - 4,
        alignItems: "center",
      }}
    >
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Icon name={iconName} type="font-awesome" size={27} />
      </View>
      <Text style={{ fontSize: 27 }}>{title}</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  buttonContainer: { margin: 5, width: "100%" },
});
