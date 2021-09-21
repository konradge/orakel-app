import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { rotate } from "../helpers";
import Randomizer from "./Randomizer";

export default ({
  selection,
  outputComponents,
  onGenerateButtonPress,
  generateButtonDisabled,
  generatorFunction,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  return (
    <View style={{ flex: 1, borderWidth: 2, borderColor: "red" }}>
      <View
        style={{
          flex: 4,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "green",
        }}
      >
        {selection}
        <Button
          title="Generate"
          type="outline"
          titleStyle={{ fontSize: 50 }}
          onPress={() => {
            if (onGenerateButtonPress) onGenerateButtonPress();
            const selectedIndex = generatorFunction();
            setLoading(true);
            console.log("Loading set");
            rotate(outputComponents, setCurrentElement, selectedIndex, () => {
              console.log("OnLeave!!!!!!!!!!");
              setLoading(false);
            });
            console.log("Leave onPress");
          }}
          disabled={generateButtonDisabled || loading}
        />
      </View>
      <View
        style={{
          flex: 3,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
        }}
      >
        {getOutput(currentElement, loading)}
      </View>
    </View>
  );
};

const getOutput = (currentElement, loading) => {
  console.log("Loading is ", loading);
  if (loading) return <View style={{ opacity: 0.5 }}>{currentElement}</View>;
  return currentElement;
};
