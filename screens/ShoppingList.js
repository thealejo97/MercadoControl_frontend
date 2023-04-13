import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
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

        const response = await fetch(
          'https://mercadocontrolback.fly.dev/api/shopping_list/?user_id=' +
            user_id,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const logo_supermarket = data[0].products_of_shopping_list[0].list_of_price.supermarket_logo
          data[0].logo_super = "https://mercadocontrolback.fly.dev"+logo_supermarket
          

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


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardImageContainer}>
        <Image style={styles.cardImage} source={{ uri: item.logo_super }} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardText}>Creada: {item.creation_date.substr(0, 10)}  <Text style={styles.cardText}>{item.creation_date.substr(12, 4)}</Text></Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Bienvenido {username}</Text>
      <Text style={{ marginTop: 10 }}>Su lista de compras es:</Text>
      <FlatList
        style={styles.list}
        data={shoppingList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default ShoppingList;