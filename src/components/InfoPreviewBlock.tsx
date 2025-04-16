import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

type InfoPreviewBlockProps = {
    child: JSX.Element
};

export const InfoPreviewBlock = (props: InfoPreviewBlockProps) => {
    const { child } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                {child}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        height: 150,
        width: 150,
        padding: 5,
    },
    button:{
        backgroundColor: 'pink',
        height: 120,
        width: 120,
    }
});