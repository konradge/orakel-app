import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import MyModal from "../MyModal";

export default class AddListItem extends Component {
  state = { isModalOpen: false };
  render() {
    return (
      <MyModal
        isOpen={this.state.isModalOpen}
        modalContent={
          <View>
            <Text>Edit here...</Text>
            <Button
              title={"OK"}
              onPress={() => this.setState({ isModalOpen: false })}
            />
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
