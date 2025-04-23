import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Find from './find';
import Home from './home';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} options={{ title: 'Accueil' }} />
        <Drawer.Screen name="Find" component={Find} options={{ title: 'Rechercher' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

