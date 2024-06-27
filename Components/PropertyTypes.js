import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Ionicons } from '@expo/vector-icons';
import PropertyList from '../PropertyListing';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native'; 

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const PropertyType = () => (
  <View>
 
    <Text>hello</Text>
    
  </View>
);



export default PropertyType;
