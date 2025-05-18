import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type InfoPreviewBlockProps = {
  child: JSX.Element;
  onPress: () => void;
};

export const InfoPreviewBlock = (props: InfoPreviewBlockProps) => {
  const { child, onPress } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {child}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    height: 150,
    width: 150,
    padding: 5,
  },
  button: {
    backgroundColor: "pink",
    height: 120,
    width: 120,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
