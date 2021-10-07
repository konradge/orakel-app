import React, { useEffect, useState } from "react";
import Counter from "./Counter";

export default ({ components }) => {
  return <Counter elements={getRandomComponents(components)} />;
};

const getRandomComponents = (components) => {
  let newComponents = components;
  return newComponents;
};
