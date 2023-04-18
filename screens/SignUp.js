import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme'

const SignUp = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    console.log("Registring")
    const csrfResponse = await fetch('https://mercadocontrolback.fly.dev/api/users/csrf_cookie/');
    const token = csrfResponse.headers.get('Set-Cookie').split('=')[1].split(';')[0];
    console.log(token)
    
    try {
      const response = await fetch('https://mercadocontrolback.fly.dev/api/users/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': token,
        },
        body: JSON.stringify({ username, password,'currency_unit':'COP' })
      });

      console.log("response",response.status)
      
      

      if (response.ok) {
        console.log("Ok")
        // login successful
        console.log('register in successfully!');
      } else {
        // login failed
        console.log("Failed",response)
        console.log('register failed: ' + response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

 
  return (
    <ScrollView>
      <View style={{flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../assets/images/arrow-left.png')} style={styles.backIcon} />
          </TouchableOpacity>
          
        </View>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <View style={styles.formContainer}>
          
          <View style={styles.form}>
            <Text style={styles.label}>username Address</Text>
            <TextInput 
              style={styles.input}
              placeholder="username"
              value={username}
              onChangeText={setusername}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input}
              secureTextEntry
              placeholder="password"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              className="py-3 bg-yellow-400 rounded-xl" style={[]}>
                <Text 
                    className="text-xl font-bold text-center text-gray-700" style={[]} onPress={handleSignUp} 
                >
                        SignUp
                </Text>
                
             </TouchableOpacity>
            

          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#877dfa',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 0,
    marginBottom: 0,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 50,
  },
  socialButtonIcon: {
    width: 30,
    height: 30,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    marginRight: 5,
  },
  signUpLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});





export default SignUp;
