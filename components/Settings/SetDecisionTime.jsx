import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dimensions,
  View,
  Button,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { Input, Overlay } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { connect } from "react-redux";
import {
  setAverageDecisionTime,
  setNumberRange,
  setTotalDecisionTime,
} from "../../redux/settings";

const SetDecisionTime = (props) => {
  console.log("THE PROPS:");
  console.log(props.time.total);
  const [isOpen, setIsOpen] = useState(false);
  const [totalTime, setTotalTime] = useState(`${props.time.total}`);
  const [totalTimeError, setTotalTimeError] = useState(null);
  const [averageTime, setAverageTime] = useState(`${props.time.average}`);
  const [averageTimeError, setAverageTimeError] = useState(null);

  useEffect(() => {
    setAverageTime(`${props.time.average}`);
    setTotalTime(`${props.time.total}`);
  }, [props.time.average, props.time.total]);

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
            label="Entscheidungszeit (ms)"
            placeholder="Entscheidungszeit gesamt"
            value={totalTime}
            errorMessage={totalTimeError}
            onChangeText={(text) => {
              if (isNaN(Number(text))) setTotalTimeError("Nur Zahlen erlaubt");
              else {
                setTotalTimeError(null);
              }
              setTotalTime(text);
            }}
            keyboardType="numeric"
          />
          <Input
            label="Durchschnittliche Zeit pro Element (ms)"
            placeholder="Entscheidungszeit/Element"
            value={averageTime}
            errorMessage={null}
            onChangeText={(text) => {
              if (isNaN(Number(text)))
                setAverageTimeError("Nur Zahlen erlaubt");
              else {
                setAverageTimeError(null);
              }
              setAverageTime(text);
            }}
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
                setTotalTime(`${props.time.total}`);
                setAverageTime(`${props.time.average}`);
                setIsOpen(false);
              }}
            />
            <Button
              title="Speichern"
              color="green"
              titleStyle={{ fontSize: 30 }}
              disabled={totalTimeError || averageTimeError}
              onPress={() => {
                showMessage({
                  message: "Entscheidungszeiten wurden erfolgreich verändert",
                  type: "success",
                });
                setIsOpen(false);
                props.setTotalDecisionTime(Number(totalTime));
                props.setAverageDecisionTime(Number(averageTime));
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
    console.log(state.settings);
    return {
      time: {
        total: state.settings.totalDecisionTime,
        average: state.settings.averageDecisionTime,
        currentlySpinning: state.currentState.currentlySpinning,
      },
    };
  },
  { setTotalDecisionTime, setAverageDecisionTime }
)(SetDecisionTime);
