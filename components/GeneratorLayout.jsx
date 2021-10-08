import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { requestSpinning, setEndIndex } from "../actions/spinnerActions";
import { rotate } from "../helpers";
import Randomizer from "./Randomizer";

const GeneratorLayout = (props) => {
  const {
    selection,
    outputComponents,
    onGenerateButtonPress,
    generateButtonDisabled,
    generatorFunction,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {selection}
        <Button
          title="Generate"
          type="outline"
          titleStyle={{ fontSize: 50 }}
          onPress={() => {
            if (onGenerateButtonPress) onGenerateButtonPress();
            props.requestSpinning();
            props.setEndIndex(generatorFunction());
          }}
          disabled={generateButtonDisabled || props.spinner.currentlySpinning}
        />
      </View>
      <View style={styles.bottom}>
        {<Randomizer components={outputComponents} />}
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  requestSpinning: () => dispatch(requestSpinning()),
  setEndIndex: (i) => dispatch(setEndIndex(i)),
});

const mapStateToProps = (state) => ({
  spinner: state.spinner,
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneratorLayout);

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
