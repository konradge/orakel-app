import React, { useEffect, useState } from "react";
import { Text, View, Animated } from "react-native";

const getPosition = (value, height) => parseInt(value, 10) * height * -1;
const getTranslateStyle = (position) => ({
  transform: [{ translateY: position }],
});

export default (props) => {
  const [height, setHeight] = useState(0);
  const [currentElement, setCurrentElement] = useState(0);
  const elements = [
    ...props.elements.map((el, i) => <View key={i}>{el}</View>),
    <View key={props.elements.length}>{props.elements[0]}</View>,
  ];

  useEffect(() => {
    if (currentElement == 0) {
      setCurrentElement((currentElement + 1) % elements.length);
    } else {
      setTimeout(() => {
        setCurrentElement((currentElement + 1) % elements.length);
      }, 100);
    }
  }, [currentElement]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ overflow: "hidden", flexDirection: "row", height }}>
        <Tick elements={elements} value={currentElement} height={height} />
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
    Animated.timing(this.animation, {
      toValue: getPosition(this.props.value, this.props.height),
      duration: this.props.value == 0 ? 0 : 100,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { elements, value, height } = this.props;
    if (value == null) return null;
    const translation = getTranslateStyle(this.animation);
    return <Animated.View style={translation}>{elements}</Animated.View>;
  }
}
