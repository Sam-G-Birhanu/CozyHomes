import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import theme from "../theme/theme.json";
const ProfileComponent = () => {
    return ( 
        <View style={styles.container}>
            <Text>
                This is USer!
            </Text>
        </View>
     );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: theme.golden
    }
})


export default ProfileComponent;