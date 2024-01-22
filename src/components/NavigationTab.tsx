import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import FileViewerScreen from '../screens/FileViewerScreen';
import DevelopmentScreen from '../screens/DevelopmentScreen';

const Toolbar: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName='Files'>
      <Tab.Screen
        name='Home'
        component={DevelopmentScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Files'
        component={FileViewerScreen}
        options={{
          tabBarLabel: 'Files',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='folder1' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Create'
        component={DevelopmentScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='pluscircleo' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Photos'
        component={DevelopmentScreen}
        options={{
          tabBarLabel: 'Photos',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='camerao' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={DevelopmentScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='user' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Toolbar;
function useEffect(arg0: () => React.JSX.Element) {
  throw new Error('Function not implemented.');
}
