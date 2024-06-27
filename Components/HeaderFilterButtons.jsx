import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Icon } from '@ui-kitten/components'; // Importing Icon from ui-kitten

const HeaderFilterButtons = () => {
  const filterButtons = [
    {
      iconName: 'filter-variant',
      onPress: () => console.log('filter all'),
    },
    {
      label: 'Price',
      onPress: () => console.log('price'),
    },
    {
      label: 'Move-In Date',
      onPress: () => console.log('move in date'),
    },
    {
      label: 'Pets',
      onPress: () => console.log('pets'),
    },
  ];

  const renderIcon = (props, iconName) => (
    <MaterialCommunityIcons name={iconName} size={24} color="#4E784D" />
  );

  return (
    <FlatList
      data={filterButtons}
      horizontal
      style={{ marginVertical: 10 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        if (item.iconName) {
          return (
            <Button
              style={[styles.button, { width: 48 }]}
              onPress={item.onPress}
              accessoryLeft={(props) => renderIcon(props, item.iconName)}
            />
          );
        }

        return (
          <Button
            style={styles.button}
            onPress={item.onPress}
          >
            {item.label}
          </Button>
        );
      }}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    borderColor: '#4E784D',
    marginHorizontal: 3,
  },
});

export default HeaderFilterButtons;
