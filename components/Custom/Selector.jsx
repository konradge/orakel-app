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
import MyModal from "../MyModal";
import AddListItem from "./AddListItem";

export default class SpinningSelector extends React.Component {
  state = {
    selectedList: this.props.selectedList,
    opened: false,
    layout: { width: 0 },
  };
  render() {
    return (
      <View style={styles.container}>
        <MyModal
          isOpen={this.state.opened}
          modalContent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "green",
                borderWidth: 1,
              }}
            >
              <FlatList
                style={{
                  borderColor: "yellow",
                  borderWidth: 2,
                }}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: "center",
                  height: "20%",
                }}
                data={this.props.listNames.map((name) =>
                  capitalizeFirstLetter(name)
                )}
                renderItem={({ item }) => (
                  <View>
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
                              this.props.onSelect(item.toLowerCase());
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
              ></FlatList>
              <AddListItem />
            </View>
          }
          outterContent={
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
          }
        ></MyModal>
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
});
