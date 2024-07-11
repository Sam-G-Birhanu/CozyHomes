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


// here there used to be a fake property list.
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

  console.log(propertyData);
  const renderItem = ({ item }) => (
    
    <TouchableOpacity style={styles.card}
          onPress={() => navigation.navigate('PropertyDetail', { itemId: item.prp_id,  itemPrice: item.price, itemArea: item.area, itemBeds: item.bedrooms, itemBath: item.bathrooms, itemImage:item.image, itemDescription:item.description,itemLatitude: item.latitude, itemLongitude: item.longitude})} 
 >
 
      <Image source={{ uri: "https://www.mebamarketing.com/wp-content/uploads/2016/03/photo_9_2023-07-23_12-18-21-758x564.jpg" }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.price}>{item.prp_title}</Text>
        <Text style={styles.address}>{item.street}, {item.city}, {item.region}</Text>
        <Text style={styles.squareMeters}>{item.area} sq. m.</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.beds}>{item.bedrooms} beds</Text>
        <Text style={styles.baths}>{item.bathrooms} baths</Text>
        {/* <Text style={styles.parking}>{item.parking} parking</Text> */}
        {/* <Text style={styles.parking}>{item.parking} parking</Text> */}
      </View>
    </TouchableOpacity>
    
  );

  const filteredData = propertyData.filter((item) => {
  if (searchText) {
    console.log("i'm in if state");
    return item.city.toLowerCase().includes(searchText.toLowerCase());
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