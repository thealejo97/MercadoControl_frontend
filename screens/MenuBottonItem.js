import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MenuBottonItem = ( {text, onPress}) => {
        /*
      * Buttom option for the drawer Navigation

          Created by: Alejandro Montaño
          Date: 17-04-2023
     */
  return (
    <TouchableOpacity
    onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

export default MenuBottonItem