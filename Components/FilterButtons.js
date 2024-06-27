import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-ui-lib';

const FilterButtons = () => {
  const [showDropdown, setShowDropdown] = useState(false);
const [dropdownContent, setDropdownContent] = useState([]);
const [showFilters, setShowFilters] = useState(false);

  const toggleDropdown = (content) => {
    setDropdownContent(content);
    setShowDropdown(!showDropdown);
  };

  return (
    <View style={styles.container}>
    {showDropdown && (
        <ScrollView style={styles.dropdown}>
          {dropdownContent.map((item, index) => (
            <TouchableOpacity key={index} style={styles.dropdownItem}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <Button label="Search" style={styles.button} />
      <Button label="Filters" style={styles.button} />
        <Button label="City" style={styles.button} onPress={() => toggleDropdown(['Addis Ababa', 'Hawassa', 'Mekelle', 'Bahir Dar', 'Dire Dawa'])} />

      
      <Button label="Type" style={styles.button} onPress={() => toggleDropdown(['Real Estate', 'Apartment', 'Condominum', 'Office', 'Villa'])} />
      
      <Button label="Bedrooms" style={styles.button} />
      <Button label="Bathroom" style={styles.button} />
      <Button label="Minimum Price" style={styles.button} />
      <Button label="Maximum Price" style={styles.button} />
      <Button label="Minimum Area" style={styles.button} />
      <Button label="Maximum Area" style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 0,
  },
  button: {
    width: '45%', // Adjust width to fit 4 columns
    borderRadius: 0,
    backgroundColor: '#4E784D',
    margin: '0.2%',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 10,
    width: '90%',
    maxHeight: 150,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4E784D',
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
});

export default FilterButtons;
