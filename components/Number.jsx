import React, { useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import GeneratorLayout from "./GeneratorLayout";
import SynchronizedSpinnerInput from "./SynchronizedSpinnerInput";

let Number = (props) => {
  console.log("NUMBER MAIN");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  return (
    <GeneratorLayout
      selection={
        <SynchronizedSpinnerInput
          minimum={props.minimum}
          maximum={props.maximum}
          onValueChange={(minValue, maxValue) => {
            setMinValue(minValue);
            setMaxValue(maxValue);
          }}
        />
      }
      generatorFunction={() => {
        const max = maxValue;
        const min = minValue;
        return Math.floor(Math.random() * (max - min));
      }}
      outputComponents={Array.from(new Array(maxValue - minValue + 1)).map(
        (_, i) => (
          <Text style={styles.bigText}>{i + minValue}</Text>
        )
      )}
    />
  );
};

export default connect((state) => {
  return {
    minimum: state.settings.minNumber,
    maximum: state.settings.maxNumber,
  };
})(Number);

const styles = StyleSheet.create({
  bigText: { fontSize: 100 },
});
