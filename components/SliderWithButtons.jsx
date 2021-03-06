import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Slider from "@react-native-community/slider";
import { getColor } from "../helpers";
import { connect } from "react-redux";

const SliderWithButtons = (props) => {
  const { onValueChange } = props;
  const [value, setValue] = useState(0.5);
  useEffect(() => {
    onValueChange(value);
  }, [value]);
  return (
    <View>
      <View>
        <View style={[styles.buttonContainer, styles.twoToOne]}>
          <Button
            type="clear"
            title="2:1"
            onPress={() => setValue(0.33)}
            disabled={props.currentlySpinning}
          />
        </View>
        <View style={[styles.buttonContainer, styles.oneToTwo]}>
          <Button
            type="clear"
            title="1:2"
            onPress={() => setValue(0.66)}
            disabled={props.currentlySpinning}
          />
        </View>
      </View>
      <Slider
        thumbTintColor={getColor(value)}
        style={styles.slider}
        value={value}
        onValueChange={(value) => {
          setValue(value);
        }}
        disabled={props.currentlySpinning}
      />
      <View style={styles.bottomButtons}>
        <View style={[styles.buttonContainer, styles.oneToThree]}>
          <Button
            type="clear"
            title="1:3"
            onPress={() => setValue(0.25)}
            disabled={props.currentlySpinning}
          />
        </View>
        <View style={[styles.buttonContainer, styles.oneToOne]}>
          <Button
            type="clear"
            title="1:1"
            onPress={() => setValue(0.5)}
            disabled={props.currentlySpinning}
          />
        </View>
        <View style={[styles.buttonContainer, styles.threeToOne]}>
          <Button
            type="clear"
            title="3:1"
            onPress={() => setValue(0.75)}
            disabled={props.currentlySpinning}
          />
        </View>
      </View>
    </View>
  );
};

export default connect((state) => ({
  currentlySpinning: state.currentState.currentlySpinning,
}))(SliderWithButtons);

const styles = StyleSheet.create({
  buttonContainer: { position: "absolute", alignItems: "center" },
  twoToOne: { width: "66%" },
  oneToTwo: {
    width: "66%",
    marginLeft: "33%",
  },
  oneToThree: {
    width: "50%",
  },
  oneToOne: {
    width: "100%",
  },
  threeToOne: {
    width: "50%",
    marginLeft: "50%",
  },
  bottomButtons: { height: 40 },
  slider: { marginTop: 40 },
});
