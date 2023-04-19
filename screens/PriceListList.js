import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import formatCurrency from './Helpers';
import { useNavigation } from '@react-navigation/native';
import SupermarketPicker from './SupermarketPicker';

const ShoppingList = () => {
  const [listOfPrice, setlistOfPrice] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSupermarket, setSelectedSupermarket] = useState(null);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setIsLoading(true);
    let url = 'https://mercadocontrolback.fly.dev/api/list_of_prices/';
    if (selectedSupermarket) {
      url += `?supermarket_id=${selectedSupermarket.id}`;
      console.log("cambiaron url", selectedSupermarket)
    }
    const fetchData = async () => {
      try {
        console.log("ejecutando ", url)
        const response = await fetch(
          url,
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
            setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedSupermarket]);


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

  const handleSupermarketChange = (supermarket) => {
    console.log("Seleccionado ", supermarket.id)
    setSelectedSupermarket(supermarket);
    };
  return (
    <View style={styles.container}>
      
      <SupermarketPicker
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSelect={handleSupermarketChange}
      />
      <Text>{selectedSupermarket ? selectedSupermarket.name : ''}</Text>
      
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