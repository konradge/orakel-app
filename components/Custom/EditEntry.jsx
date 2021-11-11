import React, { Component } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Icon,
  TextInput,
} from "react-native";
import FeedbackPressable from "../FeedbackPressable";

export default class EditEntry extends Component {
  state = { listInputValues: this.props.list };
  render() {
    const { title, list } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 50 }}>{title.toUpperCase()}</Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <FlatList
            data={list}
            renderItem={({ item, index }) => {
              return (
                <TextInput
                  style={{ fontSize: 30 }}
                  value={this.state.listInputValues[index]}
                  onChangeText={(text) => {
                    let updatedListInputValues = this.state.listInputValues;
                    updatedListInputValues[index] = text;
                    this.setState({
                      listInputValues: updatedListInputValues,
                    });
                  }}
                />
              );
            }}
            keyExtractor={(_, index) => `${index}`}
          />
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
            <Button
              title="Speichern"
              onPress={() =>
                this.props.onSave(this.state.listInputValues, this.props.title)
              }
            />
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Button title="Abbrechen" onPress={() => this.props.onAbort()} />
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
