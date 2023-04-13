import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const handleListOfPrices = async () => {
  /*
   * handle to get all the shopping list created

      How it works:

      Created by: Alejandro Montaño
      Date: 12-04-2023
   */
/*
  const csrfResponse = await fetch('https://mercadocontrolback.fly.dev/api/users/csrf_cookie/');
  const token = csrfResponse.headers.get('Set-Cookie').split('=')[1].split(';')[0];
  setCsrfToken(token);
*/
  const response = await fetch('https://mercadocontrolback.fly.dev/api/shopping_list/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': token,
    }
  });

  const data = await response.json();

  if (response.ok) {
    console.log(data);
  } else {
    console.log(response);
  }
};


export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Shopping_List</Text>
    </SafeAreaView>
  )
}