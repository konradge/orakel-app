import React, { Component } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { STATES } from "../../constants";
import { setCustomSectionState } from "../../redux/currentState";
import { setList } from "../../redux/lists";
import { Icon } from "react-native-elements";

class EditEntry extends Component {
  state = { listInputValues: this.props.list, addItemValue: "" };
  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 50 }}>{title.toUpperCase()}</Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <FlatList
            data={this.state.listInputValues}
            renderItem={({ item, index }) => {
              return (
                <View>
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
                  <Icon
                    name="trash"
                    type="evilicon"
                    size={50}
                    onPress={() => {
                      // Click on the edit-button to edit one of the list items
                      this.setState({
                        listInputValues: this.state.listInputValues.filter(
                          (value) => value != item
                        ),
                      });
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(_, index) => `${index}`}
          />
          <TextInput
            placeholder="Neuer Eintrag"
            style={{ fontSize: 30 }}
            value={this.state.addItemValue}
            onChangeText={(text) => this.setState({ addItemValue: text })}
          />
          <Icon
            name="plus"
            type="evilicon"
            size={80}
            color="green"
            onPress={() =>
              this.setState({
                listInputValues: [
                  ...this.state.listInputValues,
                  this.state.addItemValue,
                ],
                addItemValue: "",
              })
            }
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
              onPress={() => {
                this.props.setList(
                  this.props.selectedList,
                  this.state.listInputValues
                );
                this.props.close();
              }}
            />
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            {false ? (
              <Button title="Abbrechen" onPress={() => this.props.close()} />
            ) : null}
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

export default connect(
  ({ currentState, lists }) => {
    return {
      selectedList: currentState.selectedList,
      list: lists[currentState.selectedList].list,
      title: lists[currentState.selectedList].title,
    };
  },
  { setList, close: () => setCustomSectionState(STATES.MAIN) }
)(EditEntry);
