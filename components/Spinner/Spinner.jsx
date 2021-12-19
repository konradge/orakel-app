import React, {
  useEffect,
  useRef,
  useState,
  useResize,
  useLayoutEffect,
} from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import {
  resetCurrentlySpinning,
  setCurrentlySpinning,
  setHeight,
} from "../../redux/currentState";
import Tick from "./Tick";

class Spinner extends React.Component {
  state = {
    elements: this.mapElements(this.props.elements),
    defaultElement: this.props.defaultElement || <Text>0</Text>,
    animationRunning: false,
  };

  constructor(props) {
    super(props);
    this.tickRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.elements !== prevProps.elements) {
      this.setState({ elements: this.mapElements(this.props.elements) }, () =>
        this.tickRef.current.resetAnimation()
      );
    }
  }

  mapElements(elems) {
    return elems.map((el, i) => {
      return <Element key={i}>{el}</Element>;
    });
  }

  restart() {
    this.setState(
      {
        elements: this.mapElements(this.props.elements),
        animationRunning: true,
      },
      () => {
        if (this.props.onAnimationStart) this.props.onAnimationStart();
        this.tickRef.current.restartAnimation();
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View
            style={[styles.hideContainer, { height: this.state.height || 0 }]}
          >
            <Tick
              decisionTime={this.props.decisionTime}
              elements={this.state.elements}
              height={this.state.height || 0}
              ref={this.tickRef}
              onAnimationEnd={() => {
                if (this.props.onAnimationEnd) this.props.onAnimationEnd();
                this.props.resetCurrentlySpinning();
              }}
            />
          </View>
          <View
            style={styles.measurement}
            onLayout={(e) => {
              this.setState({ height: e.nativeEvent.layout.height });
            }}
          >
            <View>{this.state.elements[0] && this.state.elements[0]}</View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  ({ settings }) => ({
    decisionTime: settings.totalDecisionTime,
  }),
  {
    setCurrentlySpinning,
    resetCurrentlySpinning,
  },
  null,
  { forwardRef: true }
)(Spinner);

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
