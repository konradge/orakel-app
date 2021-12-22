import React from "react";
import { Animated, Easing } from "react-native";
import { connect } from "react-redux";

const getPosition = (value, height) => parseInt(value, 10) * height * -1;
const getTranslateStyle = (position) => ({
  transform: [{ translateY: position }],
});

class Tick extends React.Component {
  state = {
    animation: new Animated.Value(getPosition(0, this.props.height)),
  };

  resetAnimation() {
    this.setState({
      animation: new Animated.Value(getPosition(0, this.props.height)),
    });
  }

  restartAnimation() {
    this.setState(
      {
        animation: new Animated.Value(getPosition(0, this.props.height)),
      },
      () => {
        Animated.timing(this.state.animation, {
          toValue: getPosition(
            this.props.elements.length - 1,
            this.props.height
          ),
          duration: this.props.decisionTime,
          useNativeDriver: true,
          easing: Easing.bezier(0.53, -0.07, 0.63, 0.97),
        }).start(({ finished }) => {
          if (finished) {
            if (this.props.onAnimationEnd) {
              this.props.onAnimationEnd();
            }
          }
        });
      }
    );
  }

  render() {
    const { elements } = this.props;
    const translation = getTranslateStyle(this.state.animation);
    return <Animated.View style={translation}>{elements}</Animated.View>;
  }
}

export default Tick;
