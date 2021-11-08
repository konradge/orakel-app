import * as React from "react";
import { Pressable } from "react-native";

export default function FeedbackPressable(props) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
        },
        props.style,
      ]}
    >
      {props.children}
    </Pressable>
  );
}
