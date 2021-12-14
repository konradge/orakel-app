import React, { Component } from "react";
import { Text, View } from "react-native";
import Spinner from "./Spinner";

export default class Example extends Component {
  constructor() {
    this.spinnerRef = React.createRef(); //In functional component: React.useRef(null)
  }
  render() {
    return (
      <View>
        <Spinner
          ref={this.spinnerRef}
          elements={[1, 2, 3, 4, 5, 6, 7].map((el) => (
            <Text>{el}</Text>
          ))}
          onAnimationEnd={() => null}
        />
        <Button
          title={"Start animation"}
          onPress={this.spinnerRef.current.restart()}
        />
      </View>
    );
  }
}
