import { Slider } from "@miblanchard/react-native-slider";
import React, { Component, useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import { connect } from "react-redux";
import SetNumberRange from "./Settings/SetNumberRange";

const w = Dimensions.get("window").width;

const SynchronizedSpinnerInput = (props) => {
  // Default the min-value to 1/4 of the range
  const min =
    Math.floor(0.25 * (props.maximum - props.minimum)) + props.minimum;

  // Default the max-value to 3/4 of the range
  const max =
    Math.floor(0.75 * (props.maximum - props.minimum)) + props.minimum;

  // Value stored in spinner
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  //Value stored in inputs
  const [textMinValue, setTextMinValue] = useState(`${min}`);
  const [textMaxValue, setTextMaxValue] = useState(`${max}`);

  // Error shown in inputs
  const [minError, setMinError] = useState(null);
  const [maxError, setMaxError] = useState(null);

  // Run effect on update of the textual min-value (or if there is not any error anymore)
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
    } else if (Number(textMinValue) < props.minimum) {
      setMinError(`Der Wert muss mindestens ${props.minimum} sein.`);
      canUpdate = false;
    } else {
      setMinError(null);
    }

    if (canUpdate && minError === null && Number(textMinValue) != minValue) {
      setMinValue(Number(textMinValue));
    }
  }, [textMinValue, minError]);

  // Run effect on change of the textual max-value
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
    } else if (Number(textMaxValue) > props.maximum) {
      setMaxError(`Der Wert darf höchstens ${props.maximum} sein.`);
      canUpdate = false;
    } else {
      setMaxError(null);
    }

    if (canUpdate && maxError === null && Number(textMaxValue) != maxValue) {
      setMaxValue(Number(textMaxValue));
    }
  }, [textMaxValue, maxError]);

  // If the minimum or maximum of the range is updated, check if the min-value and max-value is in that range
  useEffect(() => {
    if (minValue < props.minimum) {
      setMinValue(props.minimum);
      setTextMinValue(`${props.minimum}`);
    }
    if (maxValue > props.maximum) {
      setMaxValue(props.maximum);
      setTextMaxValue(`${props.maximum}`);
    }
  }, [props.minimum, props.maximum]);

  // If the values are changed, give them to the parent
  useEffect(() => {
    props.onValueChange(minValue, maxValue);
  }, [minValue, maxValue]);

  return (
    <View
      style={{
        marginLeft: 10,
        marginRight: 10,
        width: w,
        alignItems: "stretch",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 80,
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
          disabled={props.currentlySpinning}
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
          disabled={props.currentlySpinning}
        />
      </View>
      <SetNumberRange
        trigger={
          <Icon
            name="gear"
            style={{ alignSelf: "flex-end", marginRight: 20 }}
            type="font-awesome"
            size={30}
          />
        }
      />
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
        disabled={props.currentlySpinning}
      />
    </View>
  );
};

export default connect((state) => ({
  currentlySpinning: state.currentState.currentlySpinning,
}))(SynchronizedSpinnerInput);
