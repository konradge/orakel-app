import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { STATES } from "../../constants";
import { setCustomSectionState } from "../../redux/currentState";
import { setList } from "../../redux/lists";
import { Button, Icon, Input, Text } from "react-native-elements";
import { TextWithIcon } from "../TextWithIcon";
import ConfirmationModal from "../ConfirmationModal";

class EditEntry extends Component {
  state = {
    listInputValues: this.props.list,
    addItemValue: "",
    overlayVisible: false,
  };

  saveAndClose(addedItem) {
    if (addedItem)
      this.props.setList(this.props.selectedList, [
        ...this.state.listInputValues,
        addedItem,
      ]);
    else
      this.props.setList(this.props.selectedList, this.state.listInputValues);
    this.props.close();
    this.setState({ overlayVisible: false });
  }

  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <ConfirmationModal
          close={() => this.setState({ overlayVisible: false })}
          description={
            <View>
              <Text h4>Es gibt noch Änderungen!</Text>
              <Text>
                Möchtest du den Eintrag{" "}
                <Text style={{ color: "blue" }}>{this.state.addItemValue}</Text>{" "}
                vor dem Speichern zur Liste hinzufügen?
              </Text>
            </View>
          }
          confirmText="Ja und speichern"
          rejectText="Nein, direkt speichern"
          visible={this.state.overlayVisible}
          confirmAction={() => this.saveAndClose(this.state.addItemValue)}
          rejectAction={() => this.saveAndClose()}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 50 }} numberOfLines={1} ellipsizeMode="tail">
            {title.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            alignItems: "center",
            width: "90%",
          }}
        >
          <FlatList
            style={{ width: "100%" }}
            data={this.state.listInputValues}
            renderItem={({ item, index }) => {
              return (
                <Input
                  style={{
                    fontSize: 50,
                  }}
                  value={item}
                  onChangeText={(text) => {
                    // The text at position index is being updated
                    let updatedListInputValues = [
                      ...this.state.listInputValues,
                    ];
                    updatedListInputValues[index] = text;
                    this.setState({
                      listInputValues: updatedListInputValues,
                    });
                  }}
                  rightIcon={
                    <Icon
                      name="trash"
                      type="evilicon"
                      size={50}
                      onPress={() => {
                        // Click on the edit-button to edit one of the list items
                        this.setState({
                          listInputValues: this.state.listInputValues.filter(
                            (_, i) => index != i
                          ),
                        });
                      }}
                    />
                  }
                />
              );
            }}
            keyExtractor={(_, index) => `${index}`}
          />
          <Input
            placeholder="Neuer Eintrag"
            style={{ fontSize: 40 }}
            value={this.state.addItemValue}
            onChangeText={(text) => this.setState({ addItemValue: text })}
            rightIcon={
              <Icon
                name="add"
                color="green"
                reverse
                disabled={this.state.addItemValue === ""}
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
          <Icon
            name="save"
            color="green"
            size={50}
            reverse
            onPress={() => {
              if (this.state.addItemValue) {
                this.setState({ overlayVisible: true });
              } else {
                this.saveAndClose();
              }
            }}
          />
          <Icon
            name="close"
            color="red"
            size={50}
            reverse
            onPress={() => {
              this.setState({ listInputValues: this.props.list });
              this.props.close();
            }}
          />
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
