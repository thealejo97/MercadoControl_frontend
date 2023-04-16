import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MenuBottonItem = ( {text, onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

export default MenuBottonItem