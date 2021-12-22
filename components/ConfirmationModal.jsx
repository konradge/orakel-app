import React, { useState } from "react";
import { Text } from "react-native";
import { ButtonGroup, Overlay } from "react-native-elements";

export default ({
  rejectText = "Nein",
  confirmText = "Ja",
  description = <Text>Bist du sicher?</Text>,
  confirmAction = () => null,
  rejectAction = () => null,
  visible = false,
  close = () => null,
}) => {
  return (
    <Overlay visible={visible}>
      {description}
      <ButtonGroup
        buttons={[
          <Text style={{ color: "red" }}>{rejectText}</Text>,
          <Text style={{ color: "green" }}>{confirmText}</Text>,
        ]}
        onPress={(index) => {
          if (index === 1) {
            confirmAction();
          } else {
            rejectAction();
          }
          close();
        }}
      />
    </Overlay>
  );
};
