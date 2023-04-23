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

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };
  

  useEffect(() => {
    setIsLoading(true);
    let url = 'https://mercadocontrolback.fly.dev/api/list_of_prices/';
    console.log(typeof searchText === 'string')
    if (selectedSupermarket) {
      url += `?supermarket_id=${selectedSupermarket.id}`;
    }
    if (searchText) {
      if(typeof searchText === 'string'){
        url += `${selectedSupermarket ? '&' : '?'}product_name=${searchText}`;
      }
      
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
          <TouchableOpacity onPress={() => {
            setSearchText(null);
            setSelectedSupermarket(null);
          }}>
            <Text style={styles.clearText}>Borrar</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <>
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
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingTop: 32,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 16,
      marginRight: 8,
    },
    clearText: {
      color: '#007aff',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedSupermarketContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 4,
      padding: 16,
      marginBottom: 16,
    },
    selectedSupermarketText: {
      fontWeight: 'bold',
    },
    changeSupermarketText: {
      color: '#007aff',
    },
    selectSupermarketContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 4,
      padding: 16,
      marginBottom: 16,
    },
    selectSupermarketText: {
      fontWeight: 'bold',
      color: '#007aff',
    },
    list: {
      flex: 1,
    },
    card: {
      flexDirection: 'row',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 16,
      marginBottom: 16,
    },  
    cardImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      padding: 10,
    },
    cardImageContainer: {
      padding: 20,
    },
  });


export default ShoppingList;