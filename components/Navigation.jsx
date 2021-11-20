import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import YesNoIcon from "./YesNoIcon";
import YesNo from "./YesNo";
import Number from "./Number";
import Date from "./Date";
import Custom from "./Custom";
import { connect } from "react-redux";

const Navigation = (props) => {
  if (props.lists == null) {
    return <Text>Loading...</Text>;
  }
  const Tab = createBottomTabNavigator();
  return (
    <View style={styles.wrapper}>
      <NavigationContainer
        tabBarOptions={{
          activeTintColor: "#e91e63",
        }}
      >
        <Tab.Navigator>
          <Tab.Screen
            name="JaNein"
            options={{
              tabBarLabel: "Ja/Nein",
              tabBarIcon: ({ focused }) => (
                <View style={styles.centeredView}>
                  <YesNoIcon active={focused} />
                </View>
              ),
            }}
            component={YesNo}
          />
          <Tab.Screen
            name="Zahl"
            options={{
              tabBarLabel: "Zahl",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="cube-outline"
                  type="ionicon"
                  color={focused ? "blue" : "gray"}
                />
              ),
              tabBarInactiveColor: "red",
            }}
            component={Number}
          />

          <Tab.Screen
            name="Datum"
            options={{
              tabBarLabel: "Datum",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="calendar-outline"
                  type="ionicon"
                  color={focused ? "purple" : "gray"}
                />
              ),
            }}
            component={Date}
          />

          <Tab.Screen
            name="Eigene"
            options={{
              tabBarLabel: "Eigene",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="pencil-outline"
                  type="ionicon"
                  color={focused ? "blue" : "gray"}
                />
              ),
            }}
            component={Custom}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  centeredView: { alignItems: "center" },
  text: { fontSize: 50 },
});

export default connect(({ currentState, lists }) => {
  return { lists };
})(Navigation);
