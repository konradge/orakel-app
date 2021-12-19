import React, { useState } from "react";
import {
  Button,
  Pressable,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { ButtonGroup, Overlay } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { connect } from "react-redux";
import { resetApp } from "../../redux/lists";

const DeleteData = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <View>
      <Overlay visible={showOverlay}>
        <View style={{ marginBottom: 15 }}>
          <Text style={{ color: "red", fontSize: 20 }}>
            Bist Du dir sicher, dass du alle Daten löschen willst?
          </Text>
          <Text>
            Alle erstellten Listen und veränderten Einstellungen werden
            unwiderruflich gelöscht!
          </Text>
        </View>
        <ButtonGroup
          buttons={["Abbrechen", "Löschen"]}
          onPress={(index) => {
            setShowOverlay(false);
            if (index === 1) {
              props.resetApp();
              showMessage({
                message: "Daten wurden zurückgesetzt",
                type: "success",
              });
            }
          }}
        />
      </Overlay>
      <TouchableHighlight
        onPress={() => setShowOverlay(true)}
        disabled={props.currentlySpinning}
        style={{ backgroundColor: props.disabled ? "grey" : null }}
      >
        {props.trigger}
      </TouchableHighlight>
    </View>
  );
};
export default connect(
  (state) => ({
    currentlySpinning: state.currentState.currentlySpinning,
  }),
  { resetApp }
)(DeleteData);
