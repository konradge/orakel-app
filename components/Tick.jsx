import React, { useEffect, useState } from "react";
import { Text, View, Animated, StyleSheet, Easing } from "react-native";
import { connect } from "react-redux";
import {
  acknowledgeSpinning,
  endSpinning,
  setEndIndex,
  setStartIndex,
} from "../actions/spinnerActions";

const getPosition = (value, height) => parseInt(value, 10) * height * -1;
const getTranslateStyle = (position) => ({
  transform: [{ translateY: position }],
});

class Tick extends React.Component {
  state = {
    animation: new Animated.Value(getPosition(0, this.props.height)),
  };

  componentDidUpdate() {
    if (
      this.props.spinner.shouldSpin &&
      !this.props.currentlySpinning &&
      this.props.height !== 0
    ) {
      this.restartAnimation();
    }
  }

  restartAnimation() {
    this.setState(
      {
        animation: new Animated.Value(getPosition(0, this.props.height)),
      },
      () => {
        this.props.acknowledgeSpinning();
        Animated.timing(this.state.animation, {
          toValue: getPosition(
            this.props.elements.length - 1,
            this.props.height
          ),
          duration: this.props.elements.length * 100,
          useNativeDriver: true,
          easing: Easing.bezier(0.53, -0.07, 0.63, 0.97),
        }).start(({ finished }) => {
          if (finished) {
            console.log("Animation ended");
            this.props.endSpinning();
            this.props.setStartIndex(this.props.spinner.endIndex);
            this.props.resetEndIndex();
            this.setState({
              animation: new Animated.Value(getPosition(0, this.props.height)),
            });
            //This would rerun the animation again
            //Needs some reseting of this.animation
            //this.restartAnimation();
          }
        });
      }
    );
  }

  render() {
    const { elements } = this.props;
    const translation = getTranslateStyle(this.state.animation);
    console.log("rendering tick");
    return <Animated.View style={translation}>{elements}</Animated.View>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  acknowledgeSpinning: () => dispatch(acknowledgeSpinning()),
  endSpinning: () => dispatch(endSpinning()),
  setStartIndex: (i) => dispatch(setStartIndex(i)),
  resetEndIndex: () => dispatch(setEndIndex(null)),
});

const mapStateToProps = (state) => ({
  spinner: state.spinner,
});

export default connect(mapStateToProps, mapDispatchToProps)(Tick);
