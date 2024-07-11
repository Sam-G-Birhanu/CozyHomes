import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import TabsComponent from '../Components/TabsComponent';
// import HeaderFilterButtons from '../Components/HeaderFilterButtons';
// import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
// import { NativeBaseProvider } from 'native-base';
const HomeScreen =
 ({ navigation }) => {
  return (
    <View style={styles.container}>
    {/* <HeaderFilterButtons></HeaderFilterButtons> */}
    
<TabsComponent style={styles.container} navigation={navigation}></TabsComponent>
    </View>
  );
};
HomeScreen.navigationOptions = {
  headerTintColor: '#4E784D', // Set the color of the header text
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns the content at the bottom
  }
});
export default HomeScreen;