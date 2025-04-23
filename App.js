import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Find from './find';
import Home from './home';

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

// -- Onglets dans le bas (Material Bottom Tabs)
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor="#000"
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Find"
        component={Find}
        options={{
          tabBarLabel: 'Rechercher',
          tabBarIcon: ({ color }) => <Icon name="magnify" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

// -- Navigation principale avec Drawer
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Tabs">
        <Drawer.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ title: 'Home' }}
        />
        <Drawer.Screen
          name="Rechercher"
          component={Find}
          options={{ title: 'Rechercher' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


