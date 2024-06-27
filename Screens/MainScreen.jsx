import React from 'react';
import {View} from 'react-native';

import SearchBar from '../Components/SearchBar';

function MainScreen({navigation}) {
  return (
    <View>
    <SearchBar navigation={navigation}> </SearchBar>
    </View>
  );
}

export default MainScreen;
