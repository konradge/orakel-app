import React, { useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
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

  const [shouldNotCallOnAnimationEnd, setShouldNotCallOnAnimationEnd] =
    useState(false);
  useEffect(() => {
    if (spinnerRef.current) spinnerRef.current.restart();
  }, [elements]);
  useEffect(() => {
    setElements([props.outputComponents[0]]);
    setStartIndex(0);
    setShouldNotCallOnAnimationEnd(true);
  }, [props.outputComponents]);
  const [MySpinner, setMySpinner] = useState(null);

  useEffect(() => {
    // Spinner must only be initiated once, otherwise the constructor would be called multiplte times ==> Height is reseted
    setMySpinner(
      React.forwardRef((props, ref) => <Spinner {...props} ref={ref} />)
    );
  }, []);
  if (MySpinner === null && props.outputComponents.length !== 0)
    return <Text>Loading...</Text>;
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
            const newEndIndex = generatorFunction();
            setButtonDisabled(true);
            setElements(
              getRandomComponents(
                props.outputComponents,
                startIndex,
                newEndIndex
              )
            );
            setEndIndex(newEndIndex);
          }}
          disabled={
            generateButtonDisabled ||
            buttonDisabled ||
            props.outputComponents.length == 0
          }
        />
      </View>
      <View style={styles.bottom}>
        {props.outputComponents.length === 0 ? (
          <View>
            <Icon name="ban" type="font-awesome" size={80} />
            <Text
              style={{
                fontSize: 40,
                textAlign: "center",
              }}
            >
              {props.emptyText || "Ich kann nicht zwischen Nichts entscheiden!"}
            </Text>
          </View>
        ) : (
          <MySpinner
            elements={elements}
            ref={spinnerRef}
            onAnimationEnd={() => {
              if (shouldNotCallOnAnimationEnd) {
                setShouldNotCallOnAnimationEnd(false);
              } else {
                setButtonDisabled(false);
                setStartIndex(endIndex);
                setEndIndex(endIndex);
              }
            }}
          />
        )}
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
