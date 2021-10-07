import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { isNumber } from "../helpers";
import GeneratorLayout from "./GeneratorLayout";

export default () => {
  const [maxValue, setMaxValue] = useState("10");
  const [minValue, setMinValue] = useState("0");
  const [maxError, setMaxError] = useState(null);
  const [minError, setMinError] = useState(null);

  useEffect(() => {
    if (!isNumber(maxValue)) {
      setMaxError("Number required!");
      if (isNumber(minValue)) setMinError(null);
    } else if (isNumber(minValue) && Number(maxValue) < Number(minValue)) {
      setMaxError("Maximum value must be bigger than minimum value!");
    } else {
      setMinError(null);
      setMaxError(null);
    }
  }, [maxValue]);

  useEffect(() => {
    if (!isNumber(minValue)) {
      setMinError("Number required!");
      if (isNumber(maxValue)) setMaxError(null);
    } else if (isNumber(maxValue) && Number(maxValue) < Number(minValue)) {
      setMinError("Minimum value must be smaller than maximum value!");
    } else {
      setMinError(null);
      setMaxError(null);
    }
  }, [minValue]);
  return (
    <GeneratorLayout
      selection={
        <View>
          <View style={styles.inputContainer}>
            <View style={styles.inputPartsContainer}>
              <Input
                onChangeText={setMinValue}
                value={minValue}
                placeholder="MIN"
                keyboardType="numeric"
                inputStyle={styles.input}
                errorMessage={minError}
              />
            </View>
            <Text style={styles.inputSeperator}>-</Text>
            <View style={styles.inputContainer}>
              <Input
                onChangeText={setMaxValue}
                value={maxValue}
                placeholder="MAX"
                keyboardType="numeric"
                inputStyle={styles.input}
                errorMessage={maxError}
              />
            </View>
          </View>
        </View>
      }
      generatorFunction={() => {
        const max = Number(maxValue) + 1;
        const min = Number(minValue);
        return Math.floor(Math.random() * (max - min));
      }}
      generateButtonDisabled={maxError !== null || minError !== null}
      outputComponents={Array.from(
        new Array(Number(maxValue) - Number(minValue) + 1)
      ).map((_, i) => (
        <Text style={styles.bigText}>{i + Number(minValue)}</Text>
      ))}
    />
  );
};

const styles = StyleSheet.create({
  inputPartsContainer: { width: "47%" },
  input: { width: "40%", fontSize: 50 },
  inputSeperator: { fontSize: 30 },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 2,
    width: "100%",
    justifyContent: "space-between",
  },
  bigText: { fontSize: 100 },
});
