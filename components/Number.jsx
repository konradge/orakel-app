import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import GeneratorLayout from "./GeneratorLayout";
import { Slider } from "@miblanchard/react-native-slider";
import { Input } from "react-native-elements";
import { connect } from "react-redux";

const w = Dimensions.get("window").width;

export default connect((state) => {
  return {
    minimum: state.settings.minNumber,
    maximum: state.settings.maxNumber,
  };
})((props) => {
  const min =
    Math.floor(0.25 * (props.maximum - props.minimum)) + props.minimum;
  const max =
    Math.floor(0.75 * (props.maximum - props.minimum)) + props.minimum;

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const [textMinValue, setTextMinValue] = useState(`${min}`);
  const [textMaxValue, setTextMaxValue] = useState(`${max}`);

  const [minError, setMinError] = useState(null);
  const [maxError, setMaxError] = useState(null);

  useEffect(() => {
    let canUpdate = true;
    if (isNaN(Number(textMinValue))) {
      setMinError("Eingabe muss Zahl sein!");
      canUpdate = false;
    } else if (
      !isNaN(textMaxValue) &&
      Number(textMinValue) > Number(textMaxValue)
    ) {
      setMinError("Muss kleiner als Maximum sein!");
      canUpdate = false;
    } else {
      setMinError(null);
    }

    if (canUpdate && minError === null && Number(textMinValue) != minValue) {
      setMinValue(Number(textMinValue));
    }
  }, [textMinValue, minError]);

  useEffect(() => {
    let canUpdate = true;
    if (isNaN(Number(textMaxValue))) {
      setMaxError("Eingabe muss Zahl sein!");
      canUpdate = false;
    } else if (
      !isNaN(textMinValue) &&
      Number(textMinValue) > Number(textMaxValue)
    ) {
      setMaxError("Muss größer als Minimum sein!");
      canUpdate = false;
    } else {
      setMaxError(null);
    }

    if (canUpdate && maxError === null && Number(textMaxValue) != maxValue) {
      setMaxValue(Number(textMaxValue));
    }
  }, [textMaxValue, maxError]);

  return (
    <GeneratorLayout
      selection={
        <View>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              marginRight: 10,
              width: w,
              alignItems: "stretch",
              justifyContent: "center",
              borderColor: "red",
              borderWidth: 1,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input
                style={{ fontSize: 20 }}
                value={textMinValue}
                onChangeText={setTextMinValue}
                keyboardType="number-pad"
                errorMessage={minError}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 30,
                  alignSelf: "flex-start",
                }}
              >
                bis
              </Text>
              <Input
                style={{ fontSize: 20 }}
                value={textMaxValue}
                onChangeText={setTextMaxValue}
                keyboardType="number-pad"
                errorMessage={maxError}
              />
            </View>
            <Slider
              value={[minValue, maxValue]}
              onValueChange={([min, max]) => {
                setMinValue(min);
                setTextMinValue(`${min}`);
                setMaxValue(max);
                setTextMaxValue(`${max}`);
              }}
              step={1}
              minimumValue={props.minimum}
              maximumValue={props.maximum}
              thumbStyle={{
                height: 30,
                width: 30,
                borderRadius: 30,
              }}
            />
          </View>
        </View>
      }
      generatorFunction={() => {
        const max = maxValue;
        const min = minValue;
        return Math.floor(Math.random() * (max - min));
      }}
      outputComponents={Array.from(
        new Array(Number(maxValue) - Number(minValue) + 1)
      ).map((_, i) => (
        <Text style={styles.bigText}>{i + Number(minValue)}</Text>
      ))}
    />
  );
});

// export default connect((state) => {
//   return {
//     minimum: state.settings.minNumber,
//     maximum: state.settings.maxNumber,
//   };
// })(Number);

const styles = StyleSheet.create({
  inputPartsContainer: { width: "47%" },
  input: { width: "40%", fontSize: 50 },
  inputSeperator: { fontSize: 30 },
  inputContainer: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
  },
  bigText: { fontSize: 100 },
});
