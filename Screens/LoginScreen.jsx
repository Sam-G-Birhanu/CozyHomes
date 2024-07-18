import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { LoggedInContext } from '../Contexts/LoggedInContext';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
const [password,setPassword] = useState('');
  const {user_id, setUser_id, isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext);


const userData = {
  email: email,
  password: password
};
const handleLogin = async () => {
    const userData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('https://node-trial2.mebamarketing.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        setUser_id(data.userId);
        // user_id = data.userId;
        setIsLoggedIn(true);
        console.log("This is user id", user_id);  // To confirm the userId received
        navigation.navigate('Home');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


    // console.log("i'm in bros");
 

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri:'https://www.bootdey.com/image/580x580/20B2AA/20B2AA'}}
        style={styles.header}>
        <Text style={styles.heading}>Cozy Homes</Text>
      </ImageBackground>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail}/>
        <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry={true} />

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordButtonText}>Forgot?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('SignupComponent')}>
          <Text style={styles.createAccountButtonText} >Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    width: '100%',
    height: 200,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  forgotPasswordButton: {
    width:'100%',
    textAlign:'flex-end',
  },
  forgotPasswordButtonText: {
    color: '#20B2AA',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign:'right'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    marginTop: 40,
    width: '90%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#20B2AA',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginTop: 20,
  },
  createAccountButtonText: {
    color: '#20B2AA',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
