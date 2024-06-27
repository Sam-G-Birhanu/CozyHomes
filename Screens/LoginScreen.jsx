import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,Image } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


const LoginScreen = () => {
     const [id, setId] = useState('');
  const [name, setName] = useState('');
    const [image, setImage] = useState(null);

     const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
     const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://node-trial2.mebamarketing.com/submit', {
        id,
        name,
        image
      });
      Alert.alert('Success', 'Data sent successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send data');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID:</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        placeholder="Enter ID"
      />
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
      />
      <Button title="Pick an Image" onPress={handleImagePicker} />
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;