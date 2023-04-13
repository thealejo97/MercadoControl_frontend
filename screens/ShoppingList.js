import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingList = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const user_name = await AsyncStorage.getItem('@user_name');
        setUsername(user_name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Bienvenido {username}</Text>
      <Text>Bienvenido {username}</Text>
      <Text>Bienvenido {username}</Text>
      <Text>Bienvenido {username}</Text>
      <Text>Bienvenido {username}</Text>
    </View>
  );
};

export default ShoppingList;
