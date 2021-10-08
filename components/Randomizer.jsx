import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { setElements } from "../actions/spinnerActions";
import Counter from "./Counter";

const Randomizer = ({ components, endIndex, startIndex, setElements }) => {
  console.log(startIndex + "//" + endIndex);
  return (
    <Counter
      elements={getRandomComponents(components, startIndex, endIndex)}
      allComponents={components}
    />
  );
};

const mapStateToProps = (state) => ({
  startIndex: state.spinner.startIndex,
  endIndex: state.spinner.endIndex,
});

const mapDispatchToProps = (dispatch) => ({
  setElements: (elems) => dispatch(setElements(elems)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Randomizer);

const getRandomComponents = (
  components,
  startIndex,
  endIndex,
  avgDurationPerFrame = 100,
  totalDuration = 1500
) => {
  console.log("RANDOM");
  console.log(components.length);
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
