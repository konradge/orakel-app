import React from "react";
import { Text, View } from "react-native";

export const TextWithIcon = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Text
        style={{
          fontSize: props.size,
          width: "70%",
          backgroundColor: "#eeeeee",
        }}
        onPress={props.onPress}
        numberOfLines={1}
      >
        {props.textComponent || props.text}
      </Text>
      <View style={{ width: "30%" }}>{props.icon}</View>
    </View>
  );
};
