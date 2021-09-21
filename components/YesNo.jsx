import React, { useState } from "react";
import { View, Text } from "react-native";
import { Slider, Button } from "react-native-elements";
import GeneratorLayout from "./GeneratorLayout";
import SliderWithButtons from "./SliderWithButtons";

export default () => {
  const answerText = ["NEIN", "JA"];
  const [sliderValue, setSliderValue] = useState(0.5);
  const generateAnswer = () => {
    if (Math.random() < sliderValue) {
      return 0;
    } else {
      return 1;
    }
  };
  return (
    <GeneratorLayout
      selection={
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View
            style={{
              width: "20%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30, color: "green" }}>Ja</Text>
          </View>
          <View style={{ width: "60%" }}>
            <SliderWithButtons onValueChange={setSliderValue} />
          </View>
          <View
            style={{
              width: "20%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30, color: "red" }}>Nein</Text>
          </View>
        </View>
      }
      generatorFunction={generateAnswer}
      outputComponents={["No", "Yes"].map(generateOutputComponent)}
    />
  );
};

generateOutputComponent = (value, index) => {
  return (
    <Text style={{ color: index == 1 ? "green" : "red", fontSize: 100 }}>
      {value}
    </Text>
  );
};
