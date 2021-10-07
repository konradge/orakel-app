import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
        <View style={styles.selectionContainer}>
          <View style={styles.yesNoContainer}>
            <Text style={styles.yesText}>Ja</Text>
          </View>
          <View style={styles.sliderContainer}>
            <SliderWithButtons onValueChange={setSliderValue} />
          </View>
          <View style={styles.yesNoContainer}>
            <Text style={styles.noText}>Nein</Text>
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
    <Text
      style={[index == 1 ? styles.greenText : styles.redText, styles.bigText]}
    >
      {value}
    </Text>
  );
};

const styles = StyleSheet.create({
  selectionContainer: { width: "100%", flexDirection: "row" },
  yesNoContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  yesText: { fontSize: 30, color: "green" },
  noText: { fontSize: 30, color: "red" },
  bigText: { fontSize: 100 },
  redText: { color: "red" },
  greenText: { color: "green" },
  sliderContainer: { width: "60%" },
});
