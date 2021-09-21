import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Slider from "@react-native-community/slider";
import { getColor } from "../helpers";

export default ({ onValueChange }) => {
  const [value, setValue] = useState(0.5);
  useEffect(() => {
    console.log(value);
    onValueChange(value);
  }, [value]);
  return (
    <View style={{ width: "100%" }}>
      <View>
        <View
          style={{
            position: "absolute",
            width: "66%",
            alignItems: "center",
          }}
        >
          <Button type="clear" title="2:1" onPress={() => setValue(0.33)} />
        </View>
        <View
          style={{
            position: "absolute",
            width: "66%",
            marginLeft: "33%",
            alignItems: "center",
          }}
        >
          <Button type="clear" title="1:2" onPress={() => setValue(0.66)} />
        </View>
      </View>
      <Slider
        thumbTintColor={getColor(value)}
        style={{ marginTop: 40 }}
        value={value}
        onValueChange={(value) => {
          console.log(value);
          setValue(value);
        }}
      />
      <View style={{ height: 40 }}>
        <View
          style={{
            position: "absolute",
            width: "50%",
            alignItems: "center",
          }}
        >
          <Button type="clear" title="1:3" onPress={() => setValue(0.25)} />
        </View>
        <View
          style={{
            position: "absolute",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Button type="clear" title="1:1" onPress={() => setValue(0.5)} />
        </View>
        <View
          style={{
            position: "absolute",
            width: "50%",
            marginLeft: "50%",
            alignItems: "center",
          }}
        >
          <Button type="clear" title="3:1" onPress={() => setValue(0.75)} />
        </View>
      </View>
    </View>
  );
};
