import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Navigate to EnterOtpScreen and pass parameters
    const userData = {
      name: name,
      email: email,
      password: password
    };
    const response = await fetch('https://node-trial2.mebamarketing.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Registration successful:', data);
      // Navigate to EnterOtpScreen or handle the response as needed
      navigation.navigate('EnterOtpScreen', {
      name: name,
      email: email,
      password: password,
      onSubmit: handleSubmitOtp
    });
    })
    .catch(error => {
      console.error('Error registering user:', error);
      // Handle errors, e.g., display an error message to the user
    });
    
    console.log(name, email, password);
  };
const handleSubmitOtp = (otp) => {
    // Handle OTP submission here, e.g., send OTP to server for verification
    console.log('Submitted OTP:', otp);
    // Example: Make API call to verify OTP and complete signup process
    // Replace this with your actual implementation
    // api.verifyOtp(otp, name, email, password).then(response => {
    //   // Handle success or error response
    // }).catch(error => {
    //   console.error('Error verifying OTP:', error);
    // });
  };
  return (
    <View style={styles.container}>
      {/* <Image
        source={{uri: 'https://www.bootdey.com/image/280x280/00BFFF/000000'}}
        style={styles.background}
      /> */}
      <View style={styles.logoContainer}>
        <Image
          source={{uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png'}}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius:60,
    resizeMode: 'contain',
  },

    formContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      color: '#fff',
      marginBottom: 20,
      marginTop: 20,
    },
    card: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      padding: 20,
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: '#333',
    },
    input: {
      height: 40,
      borderRadius:6,
      borderWidth: 1,
      borderColor: '#ddd',
      color: '#333',
      paddingLeft:10,
    },
    button: {
      width: '100%',
      height: 40,
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  };

  export default SignUpComponent;