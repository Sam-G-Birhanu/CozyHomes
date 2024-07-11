import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MapView, { Marker } from 'react-native-maps';


const PropertyDetail = ({ navigation }) => {
  const route = useRoute();
  const itemId = route.params?.itemId || '';
  const itemPrice = route.params?.itemPrice || '';
  const itemArea = route.params?.itemArea || '';
  const itemBeds = route.params?.itemBeds || '';
  const itemBath = route.params?.itemBath || '';
  const itemParking = route.params?.itemParking || '';
  const itemImage = route.params?.itemImage || '';
  const itemAddress = route.params?.itemAddress || '';
  const itemDescription = route.params?.itemDescription || '';
  const itemLongitude = route.params?.itemLongitude ? parseFloat(route.params.itemLongitude) : 38.724522069096565;
const itemLatitude = route.params?.itemLatitude ? parseFloat(route.params.itemLatitude) : 9.02628622223311;

console.log('itemLatitude',itemLatitude,itemDescription);

  const [activeSlide, setActiveSlide] = useState(0);

  const imageData = [
    { uri: itemImage },
    { uri: itemImage }, // Duplicate entry for testing, you may remove this
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Carousel
          layout={'default'}
          data={imageData}
          renderItem={({ item }) => (
            <Image source={{ uri: 'https://www.mebamarketing.com/wp-content/uploads/2016/03/photo_9_2023-07-23_12-18-21-758x564.jpg' }} style={styles.itemImage} />
          )}
          sliderWidth={400}
          itemWidth={380}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={imageData.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.beds}>{itemBeds} beds</Text>
          <Text style={styles.baths}>{itemBath} baths</Text>
          <Text style={styles.parking}>{itemParking} parking</Text>
        </View>
        <View style={styles.cardBody}>
          
          <Text style={styles.price}>{itemPrice}ETB</Text>
          <Text style={styles.price}>Description</Text>
          <Text style={styles.address}>{itemDescription}</Text>
          <Text style={styles.squareMeters}>Area: {itemArea} sq. m.</Text>
          <View style={styles.map_container}>
        <MapView
  style={styles.map}
  initialRegion={{
    latitude: itemLatitude, // Convert to float if needed
    longitude: itemLongitude, // Convert to float if needed
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
>
  <Marker
    coordinate={{
      latitude: itemLatitude,
      longitude: itemLongitude,
    }}
    title="Property Location"
  />
</MapView>
</View>
        </View>
        


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Adjust as needed
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  itemImage: {
    width: '100%',
    height: 500,
    borderRadius: 5,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#ffa500',
  },
  inactiveDotStyle: {
    backgroundColor: '#000',
  },
  cardBody: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
  },
  squareMeters: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  cardFooter: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  beds: {
    fontSize: 16,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  baths: {
    fontSize: 16,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  parking: {
    fontSize: 16,
    color: '#ffa500',
    fontWeight: 'bold',
  },
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

export default PropertyDetail;
