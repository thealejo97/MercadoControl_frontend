import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingList = () => {
  const [username, setUsername] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_name = await AsyncStorage.getItem('@user_name');
        const user_id = await AsyncStorage.getItem('@user_id');
        setUsername(user_name);

        const response = await fetch('https://mercadocontrolback.fly.dev/api/shopping_list/?user_id='+user_id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setShoppingList(data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{paddingTop:10}}>
      <Text>Bienvenido {username}</Text>
      <Text style={{ marginTop: 10 }}>Su lista de compras es:</Text>
      <View style={{ marginTop: 5 }}>
        {shoppingList.map((shoppingListItem) => (
          <View key={shoppingListItem.id} style={{ marginBottom: 5 }}>
            <Text>Nombre: {shoppingListItem.name}</Text>
            <Text>Usuario: {shoppingListItem.user}</Text>
            <Text style={{ marginBottom: 5 }}>
              Productos: {JSON.stringify(shoppingListItem.products_of_shopping_list)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ShoppingList;
