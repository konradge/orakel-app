import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

export default ({ active }) => {
  return (
    <View style={styles.container}>
      <Icon
        name="thumbs-up"
        type="font-awesome-5"
        color={active ? "green" : "grey"}
      />
      <Icon
        name="thumbs-down"
        type="font-awesome-5"
        color={active ? "red" : "grey"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
});
