import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const NewGame = () => {
    return (
        <View style={styles.container}>
            <Text>new game screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});