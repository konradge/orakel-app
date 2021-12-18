import React, { Component, useEffect } from "react";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { setNumberRange } from "../redux/settings";

const SetDecisionTime = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minValue, setMinValue] = useState(`${props.minValue}`);
  const [minError, setMinError] = useState(null);
  const [maxValue, setMaxValue] = useState(`${props.maxValue}`);
  const [maxError, setMaxError] = useState(null);

  useEffect(() => {
    if (isNaN(Number(minValue))) {
      setMinError("Nur Zahlen erlaubt!");
    } else if (Number(minValue) > Number(maxValue)) {
      setMinError("Kleinste Zahl muss größer als größte Zahl sein!");
    } else {
      setMinError(null);
      if (!isNaN(Number(maxValue))) setMaxError(null);
    }
  }, [minValue]);

  useEffect(() => {
    if (isNaN(Number(maxValue))) {
      setMaxError("Nur Zahlen erlaubt!");
    } else if (Number(maxValue) < Number(maxValue)) {
      setMaxError("Größte Zahl muss kleiner als kleinste Zahl sein!");
    } else {
      setMaxError(null);
      if (!isNaN(Number(minValue))) setMinError(null);
    }
  }, [maxValue]);

  return (
    <View>
      <Overlay
        style={{
          marginTop: 50,
          marginBottom: 50,
        }}
        isVisible={isOpen}
        fullScreen={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Input
            label="Kleinste Zahl"
            placeholder="Minimum"
            value={minValue}
            errorMessage={minError}
            onChangeText={setMinValue}
            keyboardType="numeric"
          />
          <Input
            label="Größte Zahl"
            placeholder="Maximum"
            value={maxValue}
            errorMessage={maxError}
            onChangeText={setMaxValue}
            keyboardType="numeric"
          />
          <Button
            title="Save"
            color="green"
            disabled={minError || maxError}
            onPress={() => {
              props.setNumberRange(minValue, maxValue);
              setIsOpen(false);
            }}
          />
        </View>
      </Overlay>
      <Pressable onPress={() => setIsOpen(true)}>{props.trigger}</Pressable>
    </View>
  );
};

export default connect(
  (state) => {
    return {
      minValue: state.settings.minNumber,
      maxValue: state.settings.maxNumber,
    };
  },
  { setNumberRange }
)(SetDecisionTime);
