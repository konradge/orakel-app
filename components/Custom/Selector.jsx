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
import FeedbackPressable from "../FeedbackPressable";

export default class SpinningSelector extends React.Component {
  state = { selected: 0, opened: false, layout: { width: 0 } };
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
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View
              style={styles.modalView}
              onLayout={(event) =>
                this.setState({ layout: event.nativeEvent.layout })
              }
            >
              <FlatList
                data={this.props.items}
                renderItem={({ item, index }) => (
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
                            this.setState({ selected: index, opened: false });
                            if (this.props.onSelect) {
                              this.props.onSelect(item.id);
                            }
                          }}
                        >
                          <Text style={{ fontSize: 30 }}>{item.title}</Text>
                        </FeedbackPressable>
                      </View>
                      <View
                        style={{ justifyContent: "flex-end", marginLeft: 50 }}
                      >
                        <Icon
                          name="pencil"
                          type="evilicon"
                          size={50}
                          onPress={() => this.props.onEditPress(item.id)}
                        />
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(_, key) => key}
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
            this.props.items.length > this.state.selected
              ? this.props.items[this.state.selected].title
              : "Loading"
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
