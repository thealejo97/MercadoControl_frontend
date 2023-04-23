import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import formatCurrency from './Helpers';
import { useNavigation } from '@react-navigation/native';
import SupermarketPicker from './SupermarketPicker';


const ShoppingList = () => {
  const [listOfPrice, setlistOfPrice] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSupermarket, setSelectedSupermarket] = useState(null);
  const [searchText, setSearchText] = useState('');


  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };
  

  useEffect(() => {
    setIsLoading(true);
    let url = 'https://mercadocontrolback.fly.dev/api/list_of_prices/';
    if (selectedSupermarket) {
      url += `?supermarket_id=${selectedSupermarket.id}`;
      
    }
    if (searchText) {
      url += `${selectedSupermarket ? '&' : '?'}product_name=${searchText}`;
      
    }
    console.log("Buscando ", url)
    const fetchData = async () => {
      try {
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
          console.log("Acabo de buscar", searchText)
          setlistOfPrice(data);
        } else {
          // Si la respuesta no es ok, mostrar un mensaje de error
          Alert.alert('Error', 'No se pudo obtener la lista de precios', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      } catch (error) {
        // Si hay un error en la conexión, mostrar un mensaje de error
        Alert.alert('Error', 'Hubo un problema de conexión', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [selectedSupermarket,searchText]);


  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Product', { id: item.id.toString() })
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
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar producto..."
            value={searchText}
            onChangeText={setSearchText}
            onEndEditing={handleSearch}
          />
          <TouchableOpacity onPress={() => setSearchText('')}>
          </TouchableOpacity>
        </View>
  
        
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <>
          {/* Nombre del supermercado seleccionado aquí... */}
          {listOfPrice.length ? (
            <FlatList
              style={styles.list}
              data={listOfPrice}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No se encontraron resultados</Text>
            </View>
          )}
        </>
      )}
      
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