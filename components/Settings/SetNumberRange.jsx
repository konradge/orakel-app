import React, { Component, useEffect } from "react";
import { useState } from "react";
import {
  Pressable,
  View,
  Button,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { Input, Overlay } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { connect } from "react-redux";
import { setNumberRange } from "../../redux/settings";

const SetNumberRange = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minValue, setMinValue] = useState(`${props.minValue}`);
  const [minError, setMinError] = useState(null);
  const [maxValue, setMaxValue] = useState(`${props.maxValue}`);
  const [maxError, setMaxError] = useState(null);

  useEffect(
    (props) => {
      if (isNaN(Number(minValue))) {
        setMinError("Nur Zahlen erlaubt!");
      } else if (Number(minValue) > Number(maxValue)) {
        setMinError("Kleinste Zahl muss größer als größte Zahl sein!");
      } else {
        setMinError(null);
        if (!isNaN(Number(maxValue))) setMaxError(null);
      }
    },
    [minValue]
  );

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
          <View
            style={{
              flexDirection: "row",
              width: Dimensions.get("window").width,
              justifyContent: "space-evenly",
            }}
          >
            <Button
              title="Abbrechen"
              color="red"
              buttonStyle={{ backgroundColor: "red" }}
              titleStyle={{ fontSize: 30 }}
              onPress={() => {
                setMinValue(`${props.minValue}`);
                setMaxValue(`${props.maxValue}`);
                setIsOpen(false);
              }}
            />
            <Button
              title="Speichern"
              color="green"
              disabled={minError || maxError}
              onPress={() => {
                showMessage({
                  message: "Zahlenbereich wurde erfolgreich verändert",
                  type: "success",
                });
                props.setNumberRange(minValue, maxValue);
                setIsOpen(false);
              }}
            />
          </View>
        </View>
      </Overlay>
      <TouchableHighlight
        onPress={() => setIsOpen(true)}
        disabled={props.currentlySpinning}
        style={{ backgroundColor: props.disabled ? "grey" : null }}
      >
        {props.trigger}
      </TouchableHighlight>
    </View>
  );
};

export default connect(
  (state) => {
    return {
      minValue: state.settings.minNumber,
      maxValue: state.settings.maxNumber,
      currentlySpinning: state.currentState.currentlySpinning,
    };
  },
  { setNumberRange }
)(SetNumberRange);
