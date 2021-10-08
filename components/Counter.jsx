import React, {
  useEffect,
  useRef,
  useState,
  useResize,
  useLayoutEffect,
} from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Tick from "./Tick";

const Counter = (props) => {
  const [height, setHeight] = useState(0);

  const elements = props.elements.map((el, i) => {
    return (
      <Element
        key={i}
        getWidth={(w) => {
          let newWidths = { ...widths };
          console.log("i: ", i);
          newWidths[i] = w;
          setWidths(newWidths);
        }}
      >
        {el}
      </Element>
    );
  });

  return (
    <View style={styles.container}>
      <View style={[styles.hideContainer, { height }]}>
        <Tick elements={elements} height={height} />
      </View>
      <View
        style={styles.measurement}
        onLayout={(e) => {
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        <View>{props.allComponents[0]}</View>
      </View>
    </View>
  );
};

export default Counter;

const Element = (props) => {
  return (
    <View
      style={{ width: Dimensions.get("window").width, alignItems: "center" }}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hideContainer: {
    overflow: "hidden",
    flexDirection: "row",
  },
  measurement: { opacity: 0 },
});
