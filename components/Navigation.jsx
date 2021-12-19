import React from "react";
import { StyleSheet, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import YesNoIcon from "./YesNoIcon";
import YesNo from "./YesNo";
import Number from "./Number";
import Date from "./Date";
import Custom from "./Custom";
import { connect } from "react-redux";
import { loadState } from "../redux/store";
import { setLists } from "../redux/lists";
import Settings from "./Settings";
import { useEffect } from "react";
import { setSettings } from "../redux/settings";

const Navigation = (props) => {
  useEffect(() => {
    loadLists();
  }, []);
  const loadLists = async () => {
    let state = await loadState();
    props.setLists(state.lists);
    props.setSettings(state.settings);
  };
  const Tab = createBottomTabNavigator();
  return (
    <View style={[styles.wrapper, { paddingTop: 0 }]}>
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
            name="Datum"
            options={{
              tabBarLabel: "Datum",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  color={focused ? "purple" : "gray"}
                />
              ),
            }}
            component={Date}
          />
          <Tab.Screen
            name="Zahl"
            options={{
              tabBarLabel: "Zahl",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="dice"
                  type="font-awesome-5"
                  color={focused ? "pink" : "gray"}
                />
              ),
              tabBarInactiveColor: "red",
            }}
            component={Number}
          />
          <Tab.Screen
            name="Eigene"
            options={{
              tabBarLabel: "Eigene",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="pencil-alt"
                  type="font-awesome-5"
                  color={
                    focused
                      ? "blue"
                      : props.lists == null || props.lists.length === 0
                      ? "lightgrey"
                      : "gray"
                  }
                />
              ),
            }}
            listeners={{
              tabPress: (e) => {
                // Prevent default action
                if (props.lists == null || props.lists.length === 0)
                  e.preventDefault();
              },
            }}
            component={Custom}
          />

          <Tab.Screen
            name="Einstellungen"
            options={{
              tabBarLabel: "Einstellungen",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="cog"
                  type="font-awesome-5"
                  color={focused ? "black" : "gray"}
                />
              ),
            }}
            component={Settings}
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

export default connect(
  ({ currentState, lists }) => {
    return { lists };
  },
  { setLists, setSettings }
)(Navigation);
