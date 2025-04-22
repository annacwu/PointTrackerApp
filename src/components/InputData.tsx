import React from "react";
import { StyleSheet, TextInput, TextInputProps, ViewStyle } from "react-native";
import { BORDER_LIGHT_GREY } from "../utils/colors";

type Props = TextInputProps & {
    value: string;
    onChangeText: (value: string) => void;
    customStyles?: ViewStyle;
    isTextArea?: boolean;
};

export const InputData = (props: Props) => {
    const {autoCorrect, autoCapitalize, value, onChangeText, customStyles = {}, secureTextEntry, isTextArea = false} = props;

    const inputStyles: ViewStyle = {
        ...styles.input,
        ...customStyles,
        height: isTextArea ? 120 : 45,
    };

    return (
        <TextInput 
        value={value} 
        onChangeText={onChangeText} 
        style={inputStyles} 
        autoCorrect={autoCorrect} 
        autoCapitalize={autoCapitalize} 
        secureTextEntry={secureTextEntry}
        numberOfLines={isTextArea ? 4: 1}
        multiline={isTextArea}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: BORDER_LIGHT_GREY,
        height: 45,
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
    }
});