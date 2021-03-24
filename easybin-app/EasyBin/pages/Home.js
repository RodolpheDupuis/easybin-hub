import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Profile from './Profile';
import Scan from './Scan';
import AddProduct from './AddProduct';

const Tab = createMaterialBottomTabNavigator();

////// PAGE CONTENT /////
export default function Home({ route }) {
  const { token, username } = route.params;

  return (
    <Tab.Navigator
      initialRouteName="Scan"
      activeColor='white'
      inactiveColor='green'
      labeled={false}
      barStyle={{ backgroundColor: '#00d65b' }}
    >
      <Tab.Screen
        name="Scan"
        children={() => (<Scan token={token} username={username} />)}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Add Product"
        children={() => (<AddProduct token={token} username={username} />)}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => (<Profile token={token} username={username} />)}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
