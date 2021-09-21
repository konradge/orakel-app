import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { sleep } from "../helpers";

export default ({ components }) => {
  const [currentComponent, setCurrentComponent] = useState(components[0]);
  useEffect(() => {
    let unmounted = false;
    (async () => {
      while (!unmounted) {
        setCurrentComponent(
          components[Math.floor(Math.random() * components.length)]
        );
        await sleep(Math.random() * 50 + 20);
      }
    })();
    return () => (unmounted = true);
  }, [currentComponent]);

  return <View style={{ opacity: 0.5 }}>{currentComponent}</View>;
};
