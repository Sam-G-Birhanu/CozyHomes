import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function SellScreen() {
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  // const [myFiles, setMyFiles] = useState([]);
  // const [formData, setFormData] = useState(new FormData());

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    // console.log("These are images", result.assets);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("resu", result.assets[0].uri)
      setSelectedImages(result.assets);
      console.log("selected", Object.keys(selectedImages));
    }
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
      
    }
    try {
      console.log("formData");
      formData.append('text', 'hello');
      formData.append('text', 'hi there');
      const response = await fetch('http://172.20.254.149:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.json();

      if (response.ok) {
        alert('Images uploaded successfully!');
        // setSelectedImages([]); // Clear selected images after successful upload
      } else {
        console.error('Upload failed:', data);
        alert('There was an error uploading the images.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload. Please try again.');
    }
  };
 
  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="upload" onPress={uploadImages} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});


// import React, { useState } from 'react';
// import { View, Button, Image, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// const SellScreen = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const pickImage = async () => {
//     // Ask for permission to access the media library
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need camera roll permissions to make this work!');
//       return;
//     }

//     // Open image picker
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       // allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     // if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     // }
//   };

//   const uploadImage = async () => {
//     if (!selectedImage) {
//       Alert.alert('Error', 'Please select an image before uploading.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', {
//       uri: selectedImage,
//       type: 'image/jpeg', // or the appropriate mime type
//       name: `image.jpg`,
//     });

//     try {
//       const response = await axios.post('http://192.168.14.13:3000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 200) {
//         Alert.alert('Success', 'Image uploaded successfully!');
//       } else {
//         Alert.alert('Error', 'Failed to upload image.');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'An error occurred while uploading image.');
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//       {selectedImage && (
//         <Image
//           source={{ uri: selectedImage }}
//           style={{ width: 200, height: 200, marginBottom: 10 }}
//         />
//       )}
//       <Button title="Select Image" onPress={pickImage} />
      
//         <Button title="Upload Image" onPress={uploadImage} />
  
//     </View>
//   );
// };

// export default SellScreen;

