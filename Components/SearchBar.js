import React, {useState} from 'react';
import { View,ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import PropertyList from '../PropertyListing';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import PropertyType from './PropertyTypes'
import Trial from './trial'
import SearchResults from '../Screens/SearchResults';

const SearchBar = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

   const handleSearch = (text) => {
    setSearchText(text);
  }
if (searchText){
  return(
    <View>
    <Text> Searched </Text>
    <SearchResults searchText={searchText}> </SearchResults>
    </View>
  );
}
   
  return (
    

    <ScrollView vertical={true} style={styles.container}>
    <View style={styles.searchInputContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search properties..."
        onChangeText={handleSearch}
        value={searchText}
      />
      
    </View>
    <Text style={styles.categoryName}>Villas</Text>
    <PropertyList navigation={navigation} PropertyType="Villa" searchText={searchText}></PropertyList>
    <Text style={styles.categoryName}>Apartments</Text>
    <PropertyList navigation={navigation} PropertyType="Apartment" searchText={searchText}></PropertyList>
    <Text style={styles.categoryName}>Villas</Text>
    <PropertyList navigation={navigation} PropertyType="Apartment" searchText={searchText}></PropertyList>
    </ScrollView>
  );
    
};


const styles = StyleSheet.create({
  container: {
flexDirection:'column',
padding:20,
  }, 
  searchInputContainer:{
    
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor:'#dcdcdc',
    backgroundColor:'#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  categoryName:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4E784D'
  }
});

export default SearchBar;

