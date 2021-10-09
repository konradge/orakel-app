import React, { useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Spinner from "./Spinner/Spinner";

const GeneratorLayout = (props) => {
  const {
    selection,
    onGenerateButtonPress,
    generateButtonDisabled,
    generatorFunction,
  } = props;

  const spinnerRef = useRef(null);

  const [elements, setElements] = useState([props.outputComponents[0]]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    spinnerRef.current.restart();
  }, [elements]);
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
            setButtonDisabled(true);
            setElements(
              getRandomComponents(props.outputComponents, startIndex, endIndex)
            );
          }}
          disabled={generateButtonDisabled || buttonDisabled}
        />
      </View>
      <View style={styles.bottom}>
        {
          <Spinner
            elements={elements}
            ref={spinnerRef}
            onAnimationEnd={() => {
              setButtonDisabled(false);
              setStartIndex(endIndex);
              setEndIndex(generatorFunction());
            }}
          />
        }
      </View>
    </View>
  );
};

const getRandomComponents = (
  components,
  startIndex,
  endIndex,
  avgDurationPerFrame = 100,
  totalDuration = 1500
) => {
  if (endIndex == null) return [components[startIndex]];
  let newComponents = [];
  if (startIndex < endIndex) {
    newComponents = components.slice(startIndex, endIndex + 1);
  } else {
    newComponents = [
      ...components.slice(startIndex, components.length),
      ...components.slice(0, endIndex + 1),
    ];
  }
  while (newComponents.length < totalDuration / avgDurationPerFrame) {
    newComponents = [
      ...components.slice(startIndex, components.length),
      ...components.slice(0, startIndex),
      ...newComponents,
    ];
  }
  return [...newComponents];
};

export default GeneratorLayout;

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
