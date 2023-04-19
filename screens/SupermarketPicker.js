import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SupermarketPicker = ({ onChange, onSelect  }) => {
  const [supermarkets, setSupermarkets] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSupermarket, setSelectedSupermarket] = useState(null);

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const response = await fetch('https://mercadocontrolback.fly.dev/api/supermarkets/');
        const data = await response.json();
        setSupermarkets(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSupermarkets();
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSupermarketSelect = (supermarket) => {
    setSelectedSupermarket(supermarket);
    onSelect(supermarket);  
    
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectedItem} onPress={handleDropdownToggle}>
        <Text style={styles.selectedItemText}>
          {selectedSupermarket ? selectedSupermarket.name : 'Supermercados'}
        </Text>
        <Ionicons
          name={isDropdownOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={24}
          color="#000"
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.dropdown}>
            {supermarkets.map((supermarket) => (
              <TouchableOpacity
                key={supermarket.id}
                style={styles.dropdownItem}
                onPress={() => handleSupermarketSelect(supermarket)}>
                <Image 
                  style={styles.cardImage} 
                  source={supermarket.logo_supermarket ? { uri: supermarket.logo_supermarket } : require('../assets/icons/canasta.png')} 
                />
                <Text style={styles.dropdownItemText}>{supermarket.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage:{
    width:30,
    height:30
  },
  container: {
    position: 'relative',
    zIndex: 1,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedItemText: {
    fontSize: 16,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 150,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: 150,
    backgroundColor: '#fff',
    borderRadius: 5,
    flex:1
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SupermarketPicker;
