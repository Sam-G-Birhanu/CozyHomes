import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel'; // Changed import

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

  const imageData = [
    { uri: itemImage },
    { uri: itemImage }, // Duplicate entry for testing, you may remove this
  ];

  return (
    <View >
      {/* <Image source={{ uri: itemImage }} style={styles.itemImage} /> */}
      <Carousel layout={'default'}
        data={imageData}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.itemImage} />
        )}
        sliderWidth={400} 
        itemWidth={380}
      />

      <View >
        <Text style={styles.price}>{itemPrice}</Text>
        <Text style={styles.address}>{itemAddress}</Text>
        <Text style={styles.squareMeters}>{itemArea} sq. m.</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.beds}>{itemBeds} beds</Text>
        <Text style={styles.baths}>{itemBath} baths</Text>
        <Text style={styles.parking}>{itemParking} parking</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    height: '80%',
    marginBottom: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardBody: {
    marginBottom: 10,
    padding: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
  squareMeters: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  cardFooter: {
    padding: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  beds: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  baths: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  parking: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
});

export default PropertyDetail;
