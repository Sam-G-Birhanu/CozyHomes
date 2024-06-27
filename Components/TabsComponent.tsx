import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import DiscoverProperties from '../Screens/DiscoverProperties';
import MainScreen from '../Screens/MainScreen';
import ForRentScreen from '../Screens/ForRentScreen';
import ForSaleScreen from '../Screens/ForSaleScreen';
import Favorites from '../Screens/Favorites';
import Category from '../Screens/Category';
import ServicesComponent from './ServicesComponent';
import ProfileComponent from './ProfileComponent';

const Tab = createBottomTabNavigator();

const TabsComponent = ({ navigation }) => {
  return (
    <Tab.Navigator
    screenOptions={{
    "tabBarStyle": [
    {
      "display": "flex"
    },
    null
  ],
    "tabBarLabelStyle": styles.tabLabel,
    tabBarActiveTintColor: '#B48D44',
    tabBarInactiveTintColor: '#4E784D',
    headerTintColor: '#4E784D',
  }}
     >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        
        options={{
          headerShown: false,
          tabBarIcon: ({ color}) => (
            <Entypo name="home" size={24} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesComponent}
        options={{
          tabBarIcon: ({ color}) => (
            <FontAwesome5 name="handshake" size={24} color={color} />
          ),
          tabBarLabel: 'Services',
        }}
      />
      
      <Tab.Screen name="Favorites " component={Favorites} 
      options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="heart" size={24} color={color} />
          ),
          tabBarLabel: 'Favorites',
        }}
      />
      <Tab.Screen name="My Profile" component={ProfileComponent}
      options={{
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={24} color={color} />

          ),
          tabBarLabel: 'My Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff', // Background color of the tab bar
    borderTopWidth: 1, // Optional: Add a border on top of the tab bar
    borderTopColor: 'black', // Optional: Border color
    margin: 1
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    
  },
});

export default TabsComponent;
