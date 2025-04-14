import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type SubmitButtonProps = {
    child: JSX.Element;
    onPress: () => void;
};

export const SubmitButton = (props: SubmitButtonProps) => {
    const { child, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            {child}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 25,
        width: '100%',
        height: 40,
        borderRadius: 8,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});