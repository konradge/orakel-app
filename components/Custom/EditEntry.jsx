import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default class EditEntry extends Component {
  state = { items: [] };
  async getItems() {}
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 4, alignItems: "center", justifyContent: "center" }}
        >
          <Text> {this.props.toEdit} </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <Button title="Speichern" />
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Button title="Abbrechen" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
