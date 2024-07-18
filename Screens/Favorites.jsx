import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LoggedInContext } from '../Contexts/LoggedInContext';

const Favorites = ({ navigation }) => {
  const { user_id } = useContext(LoggedInContext);
  const [favoritePropertyData, setFavoritePropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
  try {
    const requestOptions = {
      method: 'POST', // or 'GET' depending on your API
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers your API requires, such as authorization tokens
      },
      body: JSON.stringify({ userId: user_id }),
    };

    const response = await fetch('https://node-trial2.mebamarketing.com/favorites', requestOptions);

    if (!response.ok) {
      console.log(response);
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setFavoritePropertyData(data);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};


    if (user_id) {
      fetchProperties();
    }
  }, [user_id]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: "https://www.mebamarketing.com/wp-content/uploads/2016/03/photo_9_2023-07-23_12-18-21-758x564.jpg" }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.address}>{item.prp_title}</Text>
        <Text style={styles.squareMeters}>{item.area} sq. m.</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.beds}>{item.beds} beds</Text>
        <Text style={styles.baths}>{item.baths} baths</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.propertyListContainer}
          data={favoritePropertyData}
          renderItem={renderItem}
          
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:15,
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


export default Favorites;
