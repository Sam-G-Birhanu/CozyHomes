import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PropertyList from './PropertyListing';
import ForRentScreen from './Screens/ForRentScreen';
import ForSaleScreen from './Screens/ForSaleScreen';
import PropertyDetail from './Screens/PropertyDetailScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import SellScreen from './Screens/SellScreen';
import Add_new_property_2 from './Screens/Add_new_property_2';
import Add_new_property from './Screens/Add_new_property';
import SignUpComponent from './Components/SignupComponent';
import EnterOtpScreen from './Screens/EnterOtpScreen';

import LogoComponent from './Components/LogoComponent';
import SearchBar from './Components/SearchBar';
import MainScreen from './Screens/MainScreen';

import { PropertyProvider } from './Contexts/PropertyListContext';
import SignupComponent from './Components/SignupComponent';

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

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PropertyList" component={PropertyList} />
    <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="sign up" component={SignupComponent} />
    <Stack.Screen name="EnterOtpScreen" component={EnterOtpScreen} />
    <Stack.Screen name="search" component={SearchBar} />
    

  </Stack.Navigator>
);

const App = () => {
  return (
    <PropertyProvider>
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
          component={StackNavigator}
          headerShown= "true"
          options={{
            headerTitle: () => <LogoComponent />,
          }} 
        />

        <Drawer.Screen name="ForRent" component={ForRentScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="enter otp" component={EnterOtpScreen} />
        <Drawer.Screen name="signup" component={SignUpComponent} />
        <Drawer.Screen name="For Sale" component={ForSaleScreen} />
        {/* <Drawer.Screen name="Sell Property" component={SellScreen} /> */}
        <Drawer.Screen name="Add New Property" component={Add_new_property} />
        <Drawer.Screen name="Add New Property 2" component={Add_new_property_2} />
        {/* <Drawer.Screen name="Property Stack" component={StackNavigator} options={{ headerShown: false }} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
    </PropertyProvider>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 25,
    margin: 10,
    alignItems: 'center',
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
