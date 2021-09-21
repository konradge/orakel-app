import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Icon } from "react-native-elements";

export default ({ active }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "flex-start",
      }}
    >
      <Icon
        name="thumbs-up-outline"
        type="ionicon"
        color={active ? "green" : "grey"}
      />
      <Icon
        name="thumbs-down-outline"
        type="ionicon"
        color={active ? "red" : "grey"}
      />
    </View>
  );
};
