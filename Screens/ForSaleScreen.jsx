import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';

const ForSaleScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={{ padding: 10 }}>Home</Text>
      </TouchableOpacity>
      <Text> This is ForSale </Text>
      {/* Add more menu items here... */}
    </View>
  );
};
export default ForSaleScreen;