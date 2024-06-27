import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PropertyList from './PropertyListing';
import ApartmentsScreen from './Screens/ApartmentsScreen';
import ForRentScreen from './Screens/ForRentScreen';
import ForSaleScreen from './Screens/ForSaleScreen';
import FilterButtons from './Components/FilterButtons';
import PropertyDetail from './Screens/PropertyDetailScreen';
import PropertyType from './Components/PropertyTypes';
import LogoComponent from './Components/LogoComponent';
import SearchBar from './Components/SearchBar';
import SearchResults from './Screens/SearchResults';
import DiscoverProperties from './Screens/DiscoverProperties';
import HomeScreen from './Screens/HomeScreen';
import Profile from './Screens/Profile';
import LoginScreen from './Screens/LoginScreen';
import SellScreen from './Screens/SellScreen';
import Add_new_property from './Screens/Add_new_property';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.avatarContainer}>
        <Ionicons onPress={() => alert('Hello from heyy')} name="person-circle" size={74} color="#4E784D" />
        <Text style={styles.caption}> User </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTintColor: '#B48D44',
          drawerContentOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'red',
            activeBackgroundColor: 'red',
            inactiveBackgroundColor: 'white',
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <LogoComponent />,
          }}
        />
        {/* <Drawer.Screen name="Apartments" component={ApartmentsScreen} /> */}
        <Drawer.Screen name="ForRent" component={ForRentScreen} />
        <Drawer.Screen name="ForSale" component={ForSaleScreen} />
        <Drawer.Screen name="Sell Property" component={SellScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Add New Property" component={Add_new_property} />
        {/* <Stack.Screen name="Search Results" component={SearchResults} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 25,
    margin: 10,
    alignItems: 'center',
    // backgroundColor: 'grey',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  caption: {
    color: '#4E784D'
  },
  drawerItemList: {
    fontSize: 36,
    color: '#4E784D',
  }
});

export default App;
