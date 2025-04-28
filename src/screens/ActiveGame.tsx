import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type ActiveGameProps = RouteProp<RootStackParamList, 'ActiveGame'>;
export type ActiveGameProps = NativeStackScreenProps<RootStackParamList, 'ActiveGame'>;



export const ActiveGame = ({ route }: ActiveGameProps) => {
    const { game } = route.params;

    return (
        <View style={styles.container}>
            <Text>active game screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});