import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import formatCurrency from './Helpers';
import { useNavigation } from '@react-navigation/native';

const ShoppingList = () => {
  const [listOfPrice, setlistOfPrice] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(
          'https://mercadocontrolback.fly.dev/api/list_of_prices/',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        const data = await response.json();

        if (response.ok) {
            setlistOfPrice(data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ShoppingListDetail', { id: item.id.toString() })
      }>
      <View style={styles.card}>
        <View style={styles.cardImageContainer}>
          <Image 
          style={styles.cardImage} 
          source={item.picture ? { uri: item.picture } : require('../assets/icons/canasta.png')} 
          />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>{item.product_name}</Text>
          <Text style={styles.cardAuxText}>{item.supermarket_name}</Text>
          <Text style={styles.cardAuxText}>{formatCurrency(item.price)}</Text> 
          <Text style={styles.cardAuxText}>{item.creation_date.substr(0, 10)}</Text>

        </View>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={listOfPrice}
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
  cardAuxText: {
    fontSize: 15,
  },
});


export default ShoppingList;