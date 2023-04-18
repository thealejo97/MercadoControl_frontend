import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native'
import LoginScreen from '../screens/LoginScreen';
import ShoppingList from '../screens/ShoppingList';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUp from '../screens/SignUp';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  
  return (
    <Drawer.Navigator
      drawerContent={ (props) => <MenuItems {...props} />}
    >
      <Drawer.Screen name="WelcomeScreen" options={{ headerShown: false, drawerLabel: () => null }} component={WelcomeScreen} />
      <Drawer.Screen name="LoginScreen" options={{ headerShown: false, drawerLabel: () => null }} component={LoginScreen} />
      <Drawer.Screen name="ShoppingList" options={{ drawerLabel: 'Lista de compras', title: '' }} component={ShoppingList} />
      <Drawer.Screen name="SignUp" options={{ headerShown: false, drawerLabel: () => null }} component={SignUp} />
    </Drawer.Navigator>
  );
}
const MenuItems = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem('@token');
    await AsyncStorage.removeItem('@user_name');
    await AsyncStorage.removeItem('@user_id');
    await AsyncStorage.removeItem('@user');
    navigation.navigate('LoginScreen');
  }

  useEffect(() => {
    async function fetchUserName() {
      const name = await AsyncStorage.getItem('@user_name');
      setUserName(name);
    }
    fetchUserName();
  }, []);
  
  return(
    <DrawerContentScrollView
      style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.title}>{userName}</Text>
      </View>
      <DrawerItem
        label="Lista de compras"
        onPress={() => navigation.navigate('ShoppingList')}
      />
      <DrawerItem
        label="Cerrar sesión"
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  )
}
const styles  = StyleSheet.create({
  container:{
    padding: 15,
  },
  title:{
    fontSize : 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
})
