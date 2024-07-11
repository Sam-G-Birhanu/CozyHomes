import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ForSaleScreen = () => {
  const [address, setAddress] = useState('');
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedCoordinate(coordinate);
  };

  const handleMarkerPress = (coordinate) => {
    setSelectedCoordinate(coordinate);
  };

  const handleSubmit = () => {
    if (!address || !selectedCoordinate) {
      Alert.alert('Error', 'Please enter an address and select a location on the map.');
      return;
    }

    const propertyData = {
      address,
      latitude: selectedCoordinate.latitude,
      longitude: selectedCoordinate.longitude,
    };

    console.log('Property Data:', propertyData);

    // Reset fields after submission
    setAddress('');
    setSelectedCoordinate(null);
  };

  
  return (
    <View style={styles.map_container}>
      
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 9.03, // Addis Ababa latitude
          longitude: 38.74, // Addis Ababa longitude
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
          
        }}
      >
        {selectedCoordinate && (
          <Marker
            coordinate={selectedCoordinate}
            title="Selected Location"
            onPress={() => handleMarkerPress(selectedCoordinate)}
          />
        )}
      </MapView>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  map_container: {
    flex: 1,
    padding: 20,
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default ForSaleScreen;
