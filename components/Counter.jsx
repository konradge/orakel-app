import React, { useEffect, useState } from "react";
import { Text, View, Animated } from "react-native";

const getPosition = (value, height) => parseInt(value, 10) * height * -1;
const getTranslateStyle = (position) => ({
  transform: [{ translateY: position }],
});

export default (props) => {
  const [height, setHeight] = useState(0);
  const [currentElement, setCurrentElement] = useState(0);
  const elements = props.elements.map((el, i) => <View key={i}>{el}</View>);

  // useEffect(() => {
  //   if (currentElement == 0) {
  //     setCurrentElement((currentElement + 1) % elements.length);
  //   } else {
  //     setTimeout(() => {
  //       setCurrentElement((currentElement + 1) % elements.length);
  //     }, 4000);
  //   }
  // }, [currentElement]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          overflow: "hidden",
          flexDirection: "row",
          height,
          borderColor: "red",
          borderWidth: 1,
        }}
      >
        <Tick elements={elements} value={currentElement} height={height} />
      </View>
      <Text
        style={{ fontSize: 50, opacity: 0 }}
        onLayout={(e) => {
          console.log(e.nativeEvent.layout.height);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        0
      </Text>
    </View>
  );
};

class Tick extends React.Component {
  state = {
    animationRunning: false,
  };
  animation = new Animated.Value(getPosition(0, this.props.height));

  componentDidUpdate() {
    if (!this.state.animationRunning && this.props.height !== 0)
      this.restartAnimation();
  }

  restartAnimation() {
    this.setState(
      {
        animationRunning: true,
      },
      () => {
        Animated.timing(this.animation.setValue(0), {
          toValue: getPosition(
            this.props.elements.length - 1,
            this.props.height
          ),
          duration: this.props.elements.length * 200,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            //This would rerun the animation again
            //this.restartAnimation();
          }
        });
      }
    );
  }

  render() {
    const { elements, value, height } = this.props;
    if (value == null) return null;
    const translation = getTranslateStyle(this.animation);
    return <Animated.View style={translation}>{elements}</Animated.View>;
  }
}
