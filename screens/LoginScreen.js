import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import {styles} from '../theme/styles'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../assets/images/login.png')} 
          style={{width: 200, height: 200}} />
        </View>
        
        
      </SafeAreaView>
      <View 
        style={[styles.roundedTl50, styles.roundedTr50]} 
        className="flex-1 bg-white px-8 pt-8">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4" >Email Address</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="email"
              value="Puto el que lo lea" 
            />
            <Text className="text-gray-700 ml-4" style={[]}>Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl" style={[]}
              secureTextEntry
              placeholder="password"
              value="test12345" 
            />
            <TouchableOpacity className="flex items-end" style={[]}>
              <Text className="text-gray-700 mb-5" style={[]}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="py-3 bg-yellow-400 rounded-xl" style={[]}>
                <Text 
                    className="text-xl font-bold text-center text-gray-700" style={[]}
                >
                        Login
                </Text>
             </TouchableOpacity>
            
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5" style={[]}>Or</Text>
          <View className="flex-row justify-center space-x-12" style={[]}>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" style={[]}>
              <Image source={require('../assets/icons/google.png')} className="w-10 h-10" style={[]} />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" style={[]}>
              <Image source={require('../assets/icons/apple.png')} className="w-10 h-10" style={[]} />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10" style={[]} />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7" style={[]}>
              <Text className="text-gray-500 font-semibold" style={[]}>
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                  <Text className="font-semibold text-yellow-500" style={[]}> Sign Up</Text>
              </TouchableOpacity>
          </View>
          
      </View>
    </View>
    
  )
}