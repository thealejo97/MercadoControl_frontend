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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://mercadocontrolback.fly.dev/api/users/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // login successful
        console.log('Logged in successfully!');
      } else {
        // login failed
        console.log('Login failed: ' + data.error);
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
            <Text style={styles.label}>Email Address</Text>
            <TextInput 
              style={styles.input}
              placeholder="email"
              value={email}
              onChangeText={setEmail}
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
