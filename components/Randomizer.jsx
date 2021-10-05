import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { sleep } from "../helpers";
import Counter from "./Counter";

export default ({ components }) => {
  return <Counter elements={getRandomComponents(components)} />;
};

const getRandomComponents = (components) => {
  let newComponents = components;
  return newComponents;
};
