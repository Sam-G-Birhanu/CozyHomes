import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity,Alert } from 'react-native';
import { RadioButton, Button, Checkbox } from 'react-native-paper';
import { Icon } from '@rneui/base';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import theme from '../theme/theme.json' 

const Add_new_property_2 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [propertyTitle, setPropertyTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [purpose, setPurpose] = useState('rent');
  const [propertyType, setPropertyType] = useState('apartment');
  const [street, setStreet] = useState('');
  const [construction_status, setConstruction_status] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [garage, setGarage] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [lift, setLift] = useState(false);
  const [gym, setGym] = useState(false);
  const [generator, setGenerator] = useState(false);


  // const [category, setCategory] = useState('apartment');
  const [city, setCity] = useState('Select city');
  const [region, setRegion] = useState('Select region');

  // const [useLastAddress, setUseLastAddress] = useState(false);
  
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  // const [myFiles, setMyFiles] = useState([]);
  // const [formData, setFormData] = useState(new FormData());

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: true,
    });

    // console.log("These are images", result.assets);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("resu", result.assets[0].uri)
      setSelectedImages([...selectedImages, ...result.assets]);
      console.log("selected", Object.keys(selectedImages));
    }
  };

const handleRemoveImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    console.log(selectedImages);
  };
 



  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

const uploadImages = async () => {
     if (selectedImages.length === 0) {
      alert('Please select images to upload.');
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      // console.log(selectedImages[i].uri);
      const uri = selectedImages[i].uri;
      // console.log(selectedImages[i].uri);
      const name = uri.split('/').pop(); // Extract filename

      const type = `image/${name.split('.').pop()}`; // Determine image type
      const file = {
        uri,
        name,
        type,
      };
      formData.append('files', file);
      formData.append('propertyTitle', propertyTitle);
    formData.append('description', description); 
  formData.append('price', price);
  formData.append('purpose', purpose);
  formData.append('propertyType', propertyType); 
  formData.append('street', street);
  formData.append('city', city);
  formData.append('region', region);
  formData.append('construction_status', construction_status); 
  formData.append('bedrooms', bedrooms); 
  formData.append('bathrooms', bathrooms); 
  formData.append('area', area); 
  formData.append('garage', garage); 
  formData.append('laundry', laundry);
  formData.append('lift', lift);
  formData.append('gym', gym); 
  formData.append('generator', generator);   
    }
    try {
      console.log("formData");
      
      const response = await fetch('https://node-trial2.mebamarketing.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.json();

      if (response.ok) {
        alert('Images uploaded successfully!');
        setSelectedImages([]); // Clear selected images after successful upload
      } else {
        console.error('Upload failed:', data);
        alert('There was an error uploading the images.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload. Please try again.');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://node-trial2.mebamarketing.com/submit', {
  propertyTitle,
  description, 
  price, 
  purpose, 
  propertyType, 
  address, 
  construction_status, 
  bedrooms, 
  bathrooms, 
  area, 
  garage, 
  laundry, 
  lift,
  gym, 
  generator
      });
      Alert.alert('Success', 'Data sent successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send data');
      console.error(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {currentPage === 1 && (
        <>
          <Text style={styles.step}>Step 1 / 2</Text>
           <Text style={styles.label}>Title</Text>
<TextInput
            style={styles.input}
            placeholder="Write Property Title"
            value={propertyTitle}
            onChangeText={setPropertyTitle}
          />
           
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Write Property Description"
            value={description}
            onChangeText={setDescription}
            />
            <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Price"
            value={price}
            onChangeText={setPrice}
          />
          <Text style={styles.label}>The property is for...</Text>
          <View style={styles.row}>
            <Button
              mode={purpose === 'sell' ? 'contained' : 'outlined'}
              onPress={() => setPurpose('sell')}
              style={[styles.button]}
            >
              Sell
            </Button>
            <Button
              mode={purpose === 'rent' ? 'contained' : 'outlined'}
              onPress={() => setPurpose('rent')}
              style={styles.button}
            >
              Rent
            </Button>
          </View>

          <Text style={styles.label}>Property Type</Text>
          <View style={styles.row}>
            <Picker
              selectedValue={propertyType}
              onValueChange={(itemValue, itemIndex) => setPropertyType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="apartment" value="apartment" />
              <Picker.Item label="villa" value="villa" />
            </Picker>
          </View>



          <Text style={styles.label}>Set Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Street"
            value={street}
            onChangeText={setStreet}
          />
          
          <View style={styles.row}>
            
            <Picker
              selectedValue={city}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select City" value="" />
              <Picker.Item label="Addis Ababa" value="Addis Ababa" />
              <Picker.Item label="Commercial" value="commercial" />
            </Picker>
            <Picker
              selectedValue={region}
              onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Region" value="" />
              <Picker.Item label="Addis Ababa" value="Addis Ababa" />
              <Picker.Item label="Oromia" value="commercial" />
            </Picker>
          </View>
<Text style={styles.label}>Construction Status</Text>
          <View >
            <Button
              mode={construction_status === 'Completed' ? 'contained' : 'outlined'}
              onPress={() => setConstruction_status('Completed')}
              style={[styles.button]}
            >
              Completed
            </Button>
            <Button
              mode={construction_status === 'Under Construction' ? 'contained' : 'outlined'}
              onPress={() => setConstruction_status('Under Construction')}
              style={styles.button}
            >
              Under Construction
            </Button>
          </View>
        <Text style={styles.label}>Features</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Bedrooms"
            value={bedrooms}
            onChangeText={setBedrooms}
          />
          <TextInput
            style={styles.input}
            placeholder="Bathrooms"
            value={bathrooms}
            onChangeText={setBathrooms}
          />
          <TextInput
            style={styles.input}
            placeholder="Area in sqm"
            value={area}
            onChangeText={setArea}
          />
          
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={garage ? 'checked' : 'unchecked'}
              onPress={() => setGarage(!garage)}
            />
            <Text style={styles.checkboxLabel}>Garage</Text>
            <Checkbox
              status={gym ? 'checked' : 'unchecked'}
              onPress={() => setGym(!gym)}
            />
            <Text style={styles.checkboxLabel}>Gym</Text>
          
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={generator ? 'checked' : 'unchecked'}
              onPress={() => setGenerator(!generator)}
            />
            <Text style={styles.checkboxLabel}>Generator</Text>

            <Checkbox
              status={laundry ? 'checked' : 'unchecked'}
              onPress={() => setLaundry(!laundry)}
            />
            <Text style={styles.checkboxLabel}>Laundry</Text>
          
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={lift ? 'checked' : 'unchecked'}
              onPress={() => setLift(!lift)}
            />
            <Text style={styles.checkboxLabel}>Lift</Text>
          </View>
          

          
          <Button mode="contained" onPress={handleNext}>
            {/* <Text>Next  {'>>'} </Text> */}
            <Icon name="arrow-right" type="font-awesome" color="white" />
          </Button>

          
        </>
      )}

      {currentPage === 2 && (
        <>
          <Text style={styles.step}>Step 2 / 2</Text>

          <Button
            mode="outlined"
            onPress={pickImage}
            style={styles.uploadButton}
          >
            Upload Image
            <Icon name="upload" type="font-awesome" style={styles.uploadIcon} />
            
          </Button>
          {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}

          <View style={styles.imageContainer}>
            {selectedImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <TouchableOpacity style={styles.removeImage} onPress={() => handleRemoveImage(index)}>
                  <Icon name="times-circle" type="font-awesome" color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
            

          
<View style={styles.button}>
          <Button mode="contained" onPress={handlePrevious}>
            {/* <Text>Back  {'<<'} </Text> */}
            <Icon name="arrow-left" type="font-awesome" color="white" />
          </Button>
</View>
<View>
          <Button mode="elevated" onPress={uploadImages}>
            <Text> Submit </Text>
          </Button>
</View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  step: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    margin: 9
  },
  selectedButton: {
    backgroundColor: theme.green, // Button background color when selected
  },
  unselectedButton: {
    backgroundColor: '#fff', // Button background color when not selected
    borderColor: '#6200ee', // Button border color
    borderWidth: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 0
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  nextButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    marginBottom: 20,
  },
  uploadIcon: {
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  removeImage: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 2,
  },
  picker: {
    flex: 1,
  },
});

export default Add_new_property_2;
