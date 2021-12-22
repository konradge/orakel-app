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
import ConfirmationModal from "../ConfirmationModal";

const DeleteData = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <View>
      <ConfirmationModal
        visible={showOverlay}
        description={
          <View style={{ marginBottom: 15 }}>
            <Text style={{ color: "red", fontSize: 20 }}>
              Bist Du dir sicher, dass du alle Daten löschen willst?
            </Text>
            <Text>
              Alle erstellten Listen und veränderten Einstellungen werden
              unwiderruflich gelöscht!
            </Text>
          </View>
        }
        close={() => setShowOverlay(false)}
        confirmAction={() => {
          props.resetApp();
          showMessage({
            message: "Daten wurden zurückgesetzt",
            type: "success",
          });
        }}
      />
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
