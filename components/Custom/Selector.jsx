import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import { capitalizeFirstLetter } from "../../helpers";
import FeedbackPressable from "../FeedbackPressable";

export default class SpinningSelector extends React.Component {
  state = {
    selectedList: this.props.selectedList,
    opened: false,
    layout: { width: 0 },
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.opened}
          onRequestClose={() => {
            this.setState({ opened: false });
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              borderColor: "green",
              borderWidth: 3,
            }}
          >
            <View
              style={styles.modalView}
              onLayout={(event) =>
                this.setState({ layout: event.nativeEvent.layout })
              }
            >
              <FlatList
                data={this.props.listNames}
                renderItem={({ item }) => (
                  <View style={{ borderColor: "red", borderWidth: 1 }}>
                    <View
                      style={{
                        padding: 3,
                        margin: 2,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderColor: "lightgrey",
                        borderWidth: 1,
                      }}
                    >
                      <View style={{ justifyContent: "flex-start" }}>
                        <FeedbackPressable
                          onPress={() => {
                            this.setState({
                              selectedList: item,
                              opened: false,
                            });
                            if (this.props.onSelect) {
                              this.props.onSelect(item);
                            }
                          }}
                        >
                          <Text style={{ fontSize: 30 }}>{item}</Text>
                        </FeedbackPressable>
                      </View>
                      <View
                        style={{ justifyContent: "flex-end", marginLeft: 50 }}
                      >
                        <Icon
                          name="pencil"
                          type="evilicon"
                          size={50}
                          onPress={() => this.props.onEditPress(item)}
                        />
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(_, index) => `${index}`}
              />
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={() => this.setState({ opened: true })}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : null,
            },
          ]}
        >
          {this.props.renderSelectedItem(
            capitalizeFirstLetter(this.state.selectedList)
          )}
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalView: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: "red",
    borderWidth: 1,
  },
});
