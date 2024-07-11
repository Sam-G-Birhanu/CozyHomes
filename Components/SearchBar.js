import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import PropertyList from '../PropertyListing';
import SearchResults from '../Screens/SearchResults';

const SearchBar = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here for properties..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      {searchText ? (
        <SearchResults navigation={navigation} searchText={searchText} />
      ) : (
        <>
          <Text style={styles.categoryName}>Villas</Text>
          <PropertyList navigation={navigation} PropertyType="Villa" />
          <Text style={styles.categoryName}>Apartments</Text>
          <PropertyList navigation={navigation} PropertyType="Apartment" />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  searchInputContainer: {},
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4E784D',
  },
});

export default SearchBar;
