import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Modal, Text, View } from "react-native";

export default class MyModal extends Component {
  state = { layout: { width: 0 } };
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.isOpen}
          onRequestClose={() => {
            console.log("onRequestClose");
          }}
        >
          <View
            style={styles.modalView}
            onLayout={(event) =>
              this.setState({ layout: event.nativeEvent.layout })
            }
          >
            {this.props.modalContent}
          </View>
        </Modal>
        {this.props.outterContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
