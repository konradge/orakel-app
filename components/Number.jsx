import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
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
          <View
            style={{
              flexDirection: "row",
              borderWidth: 2,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "47%" }}>
              <Input
                onChangeText={setMinValue}
                value={minValue}
                placeholder="MIN"
                keyboardType="numeric"
                inputStyle={{ width: "40%", fontSize: 50 }}
                errorMessage={minError}
              />
            </View>
            <Text style={{ fontSize: 30 }}>-</Text>
            <View style={{ width: "47%" }}>
              <Input
                onChangeText={setMaxValue}
                value={maxValue}
                placeholder="MAX"
                keyboardType="numeric"
                inputStyle={{ width: "40%", fontSize: 50 }}
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
        <Text style={{ fontSize: 100 }}>{i + Number(minValue)}</Text>
      ))}
    />
  );
};
