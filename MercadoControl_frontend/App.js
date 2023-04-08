import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { fetchData } from './api'

export default function App()
{
  const [data, setData] = useState(null);
  
  useEffect(() => 
  {
    const getData = async () => {
      const response = await fetchData();
      setData(response);
    };
    getData();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
