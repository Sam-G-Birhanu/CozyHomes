import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import FilterButtons from './Components/FilterButtons'
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Axios from 'axios'; // Import Axios

import PropertyDetail from './Screens/PropertyDetailScreen'; 
import SearchResults from './Screens/SearchResults';


const Stack = createStackNavigator();


// const propertyData = [
//   {
//     id: '1',
//     image: 'https://www.mebamarketing.com/wp-content/uploads/2016/03/photo_9_2023-07-23_12-18-21-758x564.jpg',
//     price: '1 ETB',
//     address: 'Mexico',
//     squareMeters: '150',
//     beds: '3',
//     baths: '2',
//     parking: '1',
//     type: 'Villa'
//   },
//   {
//     id: '2',
//     image: 'https://www.mebamarketing.com/wp-content/uploads/2023/10/photo_2023-10-04_18-18-14.jpg',
//     price: '1 ETB',
//     address: 'Megenagna',
//     squareMeters: '200',
//     beds: '4',
//     baths: '3',
//     parking: '2',
//     type: 'Villa'
//   },
//   {
//     id: '3',
//     image: 'https://www.mebamarketing.com/wp-content/uploads/2023/10/photo_2023-09-26_15-01-16-758x564.jpg',
//     price: '1 ETB',
//     address: 'Bole',
//     squareMeters: '100',
//     beds: '2',
//     baths: '1',
//     parking: '0',
//     type: 'Apartment'
//   },
//   {
//     id: '4',
//     image: 'https://www.mebamarketing.com/wp-content/uploads/2016/03/photo_9_2023-07-23_12-18-21-758x564.jpg',
//     price: '1 ETB',
//     address: 'Lideta',
//     squareMeters: '100',
//     beds: '2',
//     baths: '1',
//     parking: '0',
//     type: 'Apartment'
//   }
// ];

const PropertyList = ({navigation, PropertyType, searchText}) => {
  console.log('Navigation Prop:', navigation);
  console.log('PropertyType Prop:', PropertyType);
  console.log('SearchText Prop:', searchText);
  const [propertyData, setPropertyData] = useState([]);
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('https://node-trial2.mebamarketing.com/properties');
        setPropertyData(response.data); // Assuming response.data is an array of property objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const renderItem = ({ item }) => (
    
    <TouchableOpacity style={styles.card}
          onPress={() => navigation.navigate('PropertyDetail', { itemId: item.id, itemAddress: item.address, itemPrice: item.price, itemArea: item.squareMeters, itemBeds: item.beds, i11temBath: item.baths, itemParking: item.parking, itemImage:item.image})} 
 >
 
      <Image source={{ uri: "https://www.mebamarketing.com/wp-content/uploads/2016/03/photo_9_2023-07-23_12-18-21-758x564.jpg" }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.squareMeters}>{item.area} sq. m.</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.beds}>{item.beds} beds</Text>
        <Text style={styles.baths}>{item.baths} baths</Text>
        {/* <Text style={styles.parking}>{item.parking} parking</Text> */}
        {/* <Text style={styles.parking}>{item.parking} parking</Text> */}
      </View>
    </TouchableOpacity>
    
  );

  const filteredData = propertyData.filter((item) => {
  if (searchText) {
    console.log("i'm in if state");
    return item.address.toLowerCase().includes(searchText.toLowerCase());
  } else {
    console.log("i'm in else state");
    return (!PropertyType || item.type.toLowerCase() === PropertyType.toLowerCase());
  }
});
console.log(filteredData);
if (searchText){
 navigation.navigate('SearchResults', { searchText });
 console.log("I'm in search results");
    return null;
}
  return (
    
      <ScrollView horizontal={true}>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20
    
  },
  
  propertyListContainer:{
    flexDirection: 'row',
    
  },
  card: {
    width: 360,
    marginRight:10,
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
    height: 220,
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
  },
  cardScroll: {
  flexDirection: 'row',
},
});

export default PropertyList