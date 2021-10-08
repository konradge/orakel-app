import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import YesNoIcon from "./components/YesNoIcon";
import YesNo from "./components/YesNo";
import Number from "./components/Number";
import Date from "./components/Date";
import Counter from "./components/Counter";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { createStore } from "redux";

export default () => {
  const Tab = createBottomTabNavigator();
  return (
    <Provider store={createStore(reducers)}>
      <View style={styles.wrapper}>
        <NavigationContainer
          tabBarOptions={{
            activeTintColor: "#e91e63",
          }}
        >
          <Tab.Navigator>
            <Tab.Screen
              name="YesNo"
              options={{
                tabBarLabel: "Yes/No",
                tabBarIcon: ({ focused }) => (
                  <View style={styles.centeredView}>
                    <YesNoIcon active={focused} />
                  </View>
                ),
              }}
              component={YesNo}
            />
            <Tab.Screen
              name="Number"
              options={{
                tabBarLabel: "Number",
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
              name="Date"
              options={{
                tabBarLabel: "Date",
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
              name="Counter"
              options={{
                tabBarLabel: "Counter",
              }}
              component={CustomCounter}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

const CustomCounter = () => {
  return (
    <Counter
      elements={["Ja", "Nein", "Vielleicht", "Bestimmt", "Sicher"].map(
        (x, i) => (
          <Text style={styles.text}>{x}</Text>
        )
      )}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  centeredView: { alignItems: "center" },
  text: { fontSize: 50 },
});
