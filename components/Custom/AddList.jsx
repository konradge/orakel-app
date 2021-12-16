import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import { Icon, Button, ButtonGroup } from "react-native-elements";
import { connect } from "react-redux";
import MyModal from "../MyModal";
import { addList } from "../../redux/lists";
import { showMessage } from "react-native-flash-message";
import { setSelectedList } from "../../redux/currentState";

class AddList extends Component {
  state = { isModalOpen: false, value: "" };
  render() {
    return (
      <MyModal
        isOpen={this.state.isModalOpen}
        modalContent={
          <View>
            <TextInput
              placeholder="Listennamen eingeben"
              style={{ fontSize: 28, marginBottom: 20 }}
              value={this.state.value}
              onChangeText={(text) => this.setState({ value: text })}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Icon
                color="green"
                name="check"
                size={50}
                reverse
                disabled={this.state.value === ""}
                onPress={() => {
                  this.props.addList(this.state.value);
                  this.setState({ value: "", isModalOpen: false });

                  showMessage({
                    message: `Liste ${this.state.value} wurde hinzugefügt`,
                    type: "success",
                  });
                }}
              />
              <Icon
                name="close"
                color="red"
                size={50}
                reverse
                onPress={() => {
                  this.setState({ value: "", isModalOpen: false });
                }}
              />
            </View>
          </View>
        }
        outterContent={
          <View>
            <Icon
              name="plus"
              type="evilicon"
              size={80}
              color="green"
              onPress={() => this.setState({ isModalOpen: true })}
            />
          </View>
        }
      />
    );
  }
}

export default connect(
  (state) => {
    return {};
  },
  { addList, setSelectedList }
)(AddList);
