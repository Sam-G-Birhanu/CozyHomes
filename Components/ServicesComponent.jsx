import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../theme/theme.json' 
const Professionals = [
    { icon: <MaterialIcons name="engineering" size={60} color={theme.golden} />, text: 'Engineer' },
    { icon: <MaterialIcons name="person" size={60} color={theme.golden} />, text: 'Person' },
    { icon: <MaterialIcons name="home" size={60} color={theme.golden} />, text: 'Home' },
    { icon: <MaterialIcons name="work" size={60} color={theme.golden} />, text: 'Work' },
    { icon: <MaterialIcons name="flight" size={60} color={theme.golden} />, text: 'Flight' },
];

const ServicesComponent = () => {

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.gridItem}>
            {item.icon}
            <Text>{item.text}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={Professionals}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // 2 columns to mimic your original grid
                contentContainerStyle={styles.grid}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        
    },
    grid: {
        justifyContent: 'center',
        width: '90%',
        marginTop: "5%",
        
    },
    gridItem: {
        width: '45%', // 2 columns
        height: 150, // Adjust the height as needed
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2.5%',
        borderWidth: 1,
        borderColor: "transparent",
        backgroundColor: "#FFFFED",
        // Shadow properties for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        // Shadow properties for Android
        elevation: 5,
    },
});

export default ServicesComponent;
