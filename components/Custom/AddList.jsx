import React, { Component } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import MyModal from "../MyModal";
import { addList } from "../../redux/lists";

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
            <Button
              title={"OK"}
              onPress={() => {
                this.props.addList(this.state.value);
                this.setState({ value: "", isModalOpen: false });
              }}
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

export default connect(
  (state) => {
    return {};
  },
  { addList }
)(AddList);
