import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import ShoppingList from '../screens/ShoppingList';

const Drawer = createDrawerNavigator();
export function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="LoginScreen" options={{ headerShown: false }} component={LoginScreen} />
      <Drawer.Screen name="ShoppingList" options={{ drawerLabel: ' Hola' }} component={ShoppingList} />
    </Drawer.Navigator>
  );
}
