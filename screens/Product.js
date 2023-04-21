import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity,ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Product({ route }) {
    const [Product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const id = route.params.id;
    const navigation = useNavigation();


    useEffect(() => {
    
        setIsLoading(true); 
        fetch(`https://mercadocontrolback.fly.dev/api/list_of_prices/${id}`)
          .then(response => response.json())
          .then(data => {
            setProduct(data);
            setIsLoading(false);
        })
          .catch(error => {console.error(error);setIsLoading(false);});
        }, [route.params.id]);
    
        

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
                navigation.navigate('Product', { id: item.id.toString() })
              }>
              <View style={styles.card}>
                <View style={styles.cardImageContainer}>

                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>Aaaa</Text>
        
                </View>
              </View>
            </TouchableOpacity>
          );

    return (
        <ScrollView>
        <View style={styles.container}>
            
          <Image style={styles.image} source={{ uri: `${Product?.picture}` }} />
          
          <Text style={styles.title}>{Product.product_name}</Text>
          <Text style={styles.subtitle}>Creado: {Product.creation_date.substr(0, 10)}</Text>
          
        </View>
      </ScrollView>
    )
  }


  const styles = StyleSheet.create({
    cardImage: {
      width: 80,
      height: 80,
      borderRadius: 4,
    },
    container: {
      flex: 1,
      padding: 0,
      backgroundColor: '#f0f0f0',
    },
    image: {
      width: '100%',
      height: 200,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 8,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 8,
    },
    productContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginVertical: 8,
      borderRadius: 4,
      padding: 8,
    },
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 4,
    },
    productInfo: {
      flex: 1,
      marginLeft: 8,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    productPrice: {
      fontSize: 16,
    },
    productAmount: {
      fontSize: 16,
    },
  });
  