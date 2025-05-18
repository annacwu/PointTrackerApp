import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, View } from "react-native";
import {
  TAG_GREEN,
  TAG_BLUE,
  TAG_PURPLE,
} from "../utils/colors";

type ColorInputProps = {
  itemColor: string;
  setItemColor: (color: string) => void;
};

export const ColorsInput = (props: ColorInputProps) => {
  const { itemColor, setItemColor } = props;
  const colors = [TAG_GREEN, TAG_BLUE, TAG_PURPLE];

  const onSelected = (selection: string) => {
    setItemColor(selection);
  };

  useEffect(() => {}, [itemColor]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.circle,
              { backgroundColor: color },
              ...(itemColor === color ? [styles.selectedCircle] : []),
            ]}
            onPress={() => onSelected(color)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 45,
    marginTop: 10,
    marginBottom: 10,
  },
  scroll: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "white",
  },
  selectedCircle: {
    borderColor: "black",
  },
});
