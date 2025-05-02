import React from "react";
import { StyleSheet, Text } from "react-native";

type Props = {
    text: string;
};

export const ButtonText = (props: Props) => {
    const { text } = props;

    return (
        <Text style={styles.label}>{text}</Text>
    )
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: 600,
        color: 'black',
    },
});