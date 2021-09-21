import React from "react";
import { Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import YesNoIcon from "./components/YesNoIcon";
import YesNo from "./components/YesNo";
import Number from "./components/Number";
import Date from "./components/Date";

const Home = () => {
  return (
    <View>
      <Text>Über dem Rowing...</Text>
      <Icon name="rowing" />
      <Text>Unter dem Rowing</Text>
      <YesNoIcon />
    </View>
  );
};

const Home2 = () => {
  return (
    <View>
      <Text>Home 2</Text>
    </View>
  );
};

export default () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1 }}>
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
                <View style={{ alignItems: "center" }}>
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
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};
