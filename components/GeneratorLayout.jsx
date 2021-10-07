import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <View style={styles.top}>
        {selection}
        <Button
          title="Generate"
          type="outline"
          titleStyle={{ fontSize: 50 }}
          onPress={() => {
            if (onGenerateButtonPress) onGenerateButtonPress();
            const selectedIndex = generatorFunction();
            setLoading(true);
          }}
          disabled={generateButtonDisabled || loading}
        />
      </View>
      <View style={styles.bottom}>
        {
          <Randomizer
            components={outputComponents}
            startIndex={0}
            endIndex={0}
          />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, borderWidth: 2, borderColor: "red" },
  top: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "green",
  },
  bottom: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
});
