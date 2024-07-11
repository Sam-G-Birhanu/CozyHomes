import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { PropertyContext } from '../Contexts/PropertyListContext';


// const propertyData = [
//   {
//     id: '1',
//     image: 'https://source.unsplash.com/900x900/?house',
//     price: '$250,000',
//     address: '123 Main St',
//     squareMeters: '150',
//     beds: '3',
//     baths: '2',
//     parking: '1'
//   },
//   {
//     id: '2',
//     image: 'https://source.unsplash.com/900x900/?apartment',
//     price: '$400,000',
//     address: '456 Oak Ave',
//     squareMeters: '200',
//     beds: '4',
//     baths: '3',
//     parking: '2'
//   },
//   {
//     id: '3',
//     image: 'https://source.unsplash.com/900x900/?house+front',
//     price: '$150,000',
//     address: '789 Maple Rd',
//     squareMeters: '100',
//     beds: '2',
//     baths: '1',
//     parking: '0'
//   },
//   {
//     id: '5',
//     image: 'https://source.unsplash.com/900x900/?house+front',
//     price: '$150,000',
//     address: '789 Maple Rd',
//     squareMeters: '100',
//     beds: '2',
//     baths: '1',
//     parking: '0'
//   },
//   {
//     id: '4',
//     image: 'https://source.unsplash.com/900x900/?small+house',
//     price: '$150,000',
//     address: '789 Maple Rd',
//     squareMeters: '100',
//     beds: '2',
//     baths: '1',
//     parking: '0'
//   }
// ];

const SearchResults = ({navigation, searchText}) => {
  console.log('actual res', navigation);
  console.log('Im in actual SearchResults');
  console.log('SearchText Prop:', searchText);
  // const route = useRoute();
  // const searchText = route.params?.searchText;
const {propertyData, loading, error} = useContext(PropertyContext); 

  const renderItem = ({ item }) => (
    
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.cardBody}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.address}>{item.prp_title}</Text>
        <Text style={styles.squareMeters}>{item.area} sq. m.</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.beds}>{item.beds} beds</Text>
        <Text style={styles.baths}>{item.baths} baths</Text>
        {/* <Text style={styles.parking}>{item.parking} parking</Text> */}
      </View>
    </TouchableOpacity>
  );

  const filteredData = propertyData.filter((item) => {
    return item.city.toLowerCase().includes(searchText.toLowerCase());
  });
console.log(filteredData);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
    // <Text>heyy</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:5,
  },
  searchInputContainer:{
    paddingHorizontal:20,
    
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
  propertyListContainer:{
    paddingHorizontal:5,
    marginBottom: 5000
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop:10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  cardBody: {
    marginBottom: 10,
    padding: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  address: {
    fontSize: 16,
    marginBottom: 5
  },
  squareMeters: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666'
  },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth:1,
    borderTopColor:'#dcdcdc',
    justifyContent: 'space-between',
  },
  beds: {
    fontSize: 14,
    color:'#ffa500',
    fontWeight: 'bold'
  },
  baths: {
    fontSize: 14,
    color:'#ffa500',
    fontWeight: 'bold'
  },
  parking: {
    fontSize: 14,
    color:'#ffa500',
    fontWeight: 'bold'
  }
});

export default SearchResults