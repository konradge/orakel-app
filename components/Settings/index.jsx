import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { clear } from "../../redux/store";
import { connect } from "react-redux";
import { resetApp } from "../../redux/lists";
import { showMessage } from "react-native-flash-message";
class Settings extends Component {
  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}
      >
        <Button
          icon={
            <Icon
              name="trash"
              type="font-awesome-5"
              size={30}
              color="red"
              style={{ paddingRight: 10 }}
            />
          }
          containerStyle={styles.buttonContainer}
          titleStyle={{ fontSize: 20 }}
          title="App zurücksetzen"
          onPress={() => {
            this.props.resetApp();
            clear();
            showMessage({
              message: "Daten wurden zurückgesetzt",
              type: "success",
            });
            // Alert.alert(
            //   "Zurücksetzen erfolgreich",
            //   "Alle Daten wurden zurückgesetzt.",
            //   [
            //     {
            //       text: "OK",
            //       onPress: () => null,
            //       style: "ok",
            //     },
            //   ]
            // );
          }}
        />
        <Button
          icon={
            <Icon
              name="hourglass"
              type="font-awesome-5"
              size={30}
              color="lightgreen"
              style={{ paddingRight: 10 }}
            />
          }
          containerStyle={styles.buttonContainer}
          titleStyle={{ fontSize: 20, textAlign: "left" }}
          title="Entscheidungszeit verändern"
        />
        <Button
          icon={
            <Icon
              name="sliders"
              type="font-awesome"
              size={30}
              color="lightgreen"
              style={{ paddingRight: 10 }}
            />
          }
          containerStyle={styles.buttonContainer}
          titleStyle={{ fontSize: 20, textAlign: "left" }}
          title="Zahl: Minimum/Maximum anpassen"
        />
      </View>
    );
  }
}

export default connect(
  (state) => {
    return {};
  },
  { resetApp: resetApp }
)(Settings);

const styles = StyleSheet.create({
  buttonContainer: { margin: 5, width: "100%" },
});
