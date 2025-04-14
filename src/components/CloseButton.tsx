import React from "react";
import { StyleSheet, TouchableOpacity,Text } from "react-native";
import { BORDER_LIGHT_GREY } from "../utils/colors";

type CloseButtonProps = {
    onPress: () => void;
};


export const CloseButton = (props: CloseButtonProps) => {
    const { onPress } = props;
    
    return (
        <TouchableOpacity style={styles.closeButton} onPress={onPress}>
        <Text style={styles.closeText}>X</Text>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: BORDER_LIGHT_GREY,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
})