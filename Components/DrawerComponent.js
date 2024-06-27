import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const DrawerComponent = (props) => {
  const { navigation } = props;

  const handleMenuSelection = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{ flex: 1 }}>
      
      <TouchableOpacity onPress={() => handleMenuSelection('HomeScreen')}>
        <MaterialCommunityIcons name="home" size={24} color="#4E784D" /> 
        <Text>Home</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default DrawerComponent;
