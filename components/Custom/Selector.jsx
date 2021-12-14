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
import { Icon, Input } from "react-native-elements";
import { connect } from "react-redux";
import { capitalizeFirstLetter } from "../../helpers";
import {
  setCustomSectionState,
  setSelectedList,
} from "../../redux/currentState";
import FeedbackPressable from "../FeedbackPressable";
import MyModal from "../MyModal";
import AddList from "./AddList";
import { STATES } from "../../constants";
import { removeList } from "../../redux/lists";
import { defaultLists } from "./defaultValues";
import { TextWithIcon } from "../TextWithIcon";

class Selector extends React.Component {
  state = {
    opened: false,
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
              }}
            >
              <FlatList
                data={this.props.listNames}
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
                      <TextWithIcon
                        onPress={() => {
                          // Click on the name of a list, to select the corresponding list
                          this.props.setSelectedList(item.toLowerCase());
                          this.setState({
                            opened: false,
                          });
                        }}
                        size={30}
                        textComponent={
                          <Text
                            style={{ fontSize: 30, minWidth: "40%" }}
                            numberOfLines={1}
                          >
                            {item}
                          </Text>
                        }
                        icon={
                          <View
                            style={{
                              flexDirection: "row",
                            }}
                          >
                            <Icon
                              name="pencil"
                              type="evilicon"
                              size={50}
                              onPress={() => {
                                // Click on the edit-button to edit one of the list items
                                this.props.setCustomSectionState(STATES.EDIT);
                                this.props.setSelectedList(item.toLowerCase());
                              }}
                            />
                            {!Object.keys(defaultLists).includes(
                              item.toLowerCase()
                            ) ? (
                              <Icon
                                name="trash"
                                type="evilicon"
                                size={50}
                                onPress={() => {
                                  // Click on the edit-button to edit one of the list items
                                  this.props.setSelectedList(
                                    Object.keys(defaultLists)[0]
                                  );
                                  this.setState(
                                    {
                                      opened: false,
                                    },
                                    () =>
                                      this.props.removeList(item.toLowerCase())
                                  );
                                }}
                              />
                            ) : null}
                          </View>
                        }
                      />
                    </View>
                  </View>
                )}
                keyExtractor={(_, index) => `${index}`}
              ></FlatList>
              <AddList />
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
                capitalizeFirstLetter(this.props.selectedList)
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

export default connect(
  ({ currentState, lists }) => {
    return {
      selectedList: currentState.selectedList,
      lists,
      listNames: Object.keys(lists).map((key) => lists[key].title),
    };
  },
  { setSelectedList, setCustomSectionState, removeList }
)(Selector);
