import React, { useEffect, useState } from "react";
import { Text, View, Animated } from "react-native";

const numbers = Array(10)
  .fill()
  .map((_, i) => i);

const getPosition = (value, height) => parseInt(value, 10) * height * -1;
const getTranslateStyle = (position) => ({
  transform: [{ translateY: position }],
});

export default () => {
  const [height, setHeight] = useState(0);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log("Set number to" + (number + 1));
      setNumber((number + 1) % 10);
    }, 1000);
  }, [number]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ overflow: "hidden", flexDirection: "row", height }}>
        <Tick numbers={numbers} value={number} height={height} />
      </View>
      <Text
        style={{ fontSize: 50, opacity: 0 }}
        onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
      >
        0
      </Text>
    </View>
  );
};

class Tick extends React.Component {
  animation = new Animated.Value(getPosition(0, this.props.height));
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props);
    Animated.timing(this.animation, {
      toValue: getPosition(this.props.value, this.props.height),
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    console.log(this.props);
    const { numbers, value, height } = this.props;
    if (value == null) return null;
    const translation = getTranslateStyle(this.animation);
    return (
      <Animated.View style={translation}>
        {numbers.map((i) => (
          <Text style={{ fontSize: 50 }} key={i}>
            {i}
          </Text>
        ))}
      </Animated.View>
    );
  }
}
