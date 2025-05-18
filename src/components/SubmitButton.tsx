import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type SubmitButtonProps = {
  child: JSX.Element;
  onPress: () => void;
  customStyles?: ViewStyle;
};

export const SubmitButton = (props: SubmitButtonProps) => {
  const { child, onPress, customStyles = {} } = props;

  const buttonStyles: ViewStyle = {
    ...styles.button,
    ...customStyles,
  };

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      {child}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    height: 40,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
