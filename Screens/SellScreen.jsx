// import React from "react";
// import { View, Text } from "react-native";

// const SellScreen =  () => {
//     return (
//         <View>
//             <Text>
//                 SEll here!
//             </Text>
//         </View>
//       );
// }

// export default SellScreen;
// import React, { useState } from 'react';
// import { View, Button, Image, Text, StyleSheet } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';

// const SellScreen = () => {
//   const [fileUri, setFileUri] = useState(null);

//   const selectFile = () => {
//     launchImageLibrary({}, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.assets && response.assets.length > 0) {
//         setFileUri(response.assets[0].uri);
//       }
//     });
//   };

//   const uploadFile = async () => {
//     if (!fileUri) {
//       alert('No file selected');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', {
//       uri: fileUri,
//       type: 'image/jpeg', // or the appropriate type
//       name: 'photo.jpg', // or the appropriate file name
//     });

//     try {
//       const response = await fetch('http://yourserver.com/upload', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       const result = await response.json();
//       console.log('Upload successful', result);
//     } catch (error) {
//       console.error('Upload failed', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {fileUri && <Image source={{ uri: fileUri }} style={styles.image} />}
//       <Button title="Select File" onPress={selectFile} />
//       <Button title="Upload File" onPress={uploadFile} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginBottom: 20,
//   },
// });

// export default SellScreen;

import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SellScreen = () => {
  const [image, setImage] = useState(null);
  const [fileUri, setFileUri] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFileUri(result.assets[0].uri); // Set the fileUri state
    }
  };

  const uploadFile = async () => {
    if (!fileUri) {
      Alert.alert('No file selected');
      return;
    }
    console.log(fileUri);
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: 'image/jpeg', // or the appropriate type
      name: 'photo.jpg', // or the appropriate file name
    });
console.log('i am in upload file');
    try {
        console.log('i am in try file');
      const response = await fetch('http://172.20.145.53:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = await response.json();
      console.log('Upload successful', result);
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Upload File" onPress={uploadFile} />
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

export default SellScreen;
