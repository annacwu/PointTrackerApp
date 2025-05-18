import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BORDER_LIGHT_GREY } from "../utils/colors";

type MenuProps = {
  newGamePress: () => void;
  addPlayersPress: () => void;
};

export const Menu = (props: MenuProps) => {
  // TODO: ADD ANIMATION
  const { newGamePress, addPlayersPress } = props;

  return (
    <View style={styles.centeredView}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.menuOption} onPress={newGamePress}>
          <Text style={styles.label}>New Game</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.menuOption} onPress={addPlayersPress}>
          <Text style={styles.label}>Add Players</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 100,
    width: 150,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
  },
  menuOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: BORDER_LIGHT_GREY,
    borderTopColor: BORDER_LIGHT_GREY,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: BORDER_LIGHT_GREY,
  },
});
