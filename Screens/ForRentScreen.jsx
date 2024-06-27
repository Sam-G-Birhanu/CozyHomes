// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, Text, TouchableOpacity } from 'react-native';

// const ForRentScreen = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//         <Text style={{ padding: 10 }}>Home</Text>
//       </TouchableOpacity>
//       <Text> This is menu </Text>
//       {/* Add more menu items here... */}
//     </View>
//   );
// };

// export default ForRentScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PropertyListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://node-trial2.mebamarketing.com/properties');
      setProperties(response.data);
      // fetch data from firebase acc 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>This is rent</Text>
      <Text>{item.prp_title}</Text>
      <Text>{item.prp_id}</Text>
      {/* Display other property information */}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={properties}
      renderItem={renderItem}
      keyExtractor={(item) => item.prp_id.toString()}
    />
  );
};

export default PropertyListScreen;
