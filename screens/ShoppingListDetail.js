import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator,ScrollView,BackHandler  } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function ShoppingListDetail({ route }) {
  const [shoppingList, setShoppingList] = useState(null);
  const id = route.params.id;
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('ShoppingList');
      return true;
    });

    fetch(`https://mercadocontrolback.fly.dev/api/shopping_list/${id}`)
      .then(response => response.json())
      .then(data => setShoppingList(data))
      .catch(error => console.error(error));
    }, [id]);

  if (!shoppingList) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
  }

  const products = shoppingList.products_of_shopping_list;
  const logo_supermarket = products[0].list_of_price.supermarket_logo
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: `https://mercadocontrolback.fly.dev${logo_supermarket}` }} />
        <Text style={styles.title}>{shoppingList.name}</Text>
        <Text style={styles.subtitle}>Añadido: {shoppingList.creation_date.substr(0, 10)}</Text>
        {products.map(product => (
          <View key={product.list_of_price.id} style={styles.productContainer}>
            <Image 
              style={styles.cardImage} 
              source={product.list_of_price.picture ? { uri: `https://mercadocontrolback.fly.dev${product.list_of_price.picture}` } : require('../assets/icons/canasta.png')} 
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.list_of_price.product_name}</Text>
              <Text style={styles.productPrice}>Precio: {product.list_of_price.price}</Text>
              <Text style={styles.productAmount}>Cantidad a comprar: {product.amount}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
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
