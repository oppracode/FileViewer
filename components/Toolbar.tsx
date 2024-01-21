import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import FileViewerScreen from "../screens/FileViewerScreen";

const Toolbar: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Files">
      <Tab.Screen
        name="Home"
        component={FileViewerScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Files"
        component={FileViewerScreen}
        options={{
          tabBarLabel: "Files",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="folder1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={FileViewerScreen}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Photos"
        component={FileViewerScreen}
        options={{
          tabBarLabel: "Photos",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="camerao" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={FileViewerScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Toolbar;
