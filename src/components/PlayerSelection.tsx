import React, { useState } from "react";
import { usePlayerContext } from "../contexts/PlayerContext";
import { AddPlayerModal } from "./AddPlayerModal";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Spacing } from "./Spacing";
import MultiDropdown from "./MultiDropdown";

export const PlayerSelection = () => {
  const { selectedPlayers, setSelectedPlayers, playerOptions } =
    usePlayerContext();

  const [playerModalVisible, setPlayerModalVisible] = useState(false);

  const openAddPlayerModal = () => {
    setPlayerModalVisible(true);
  };

  return (
    <>
      <AddPlayerModal
        modalVisible={playerModalVisible}
        setModalVisible={setPlayerModalVisible}
      />
      <View style={styles.horizontal}>
        <Text style={styles.label}>Players</Text>
        <Spacing horizontal={5} />
        <TouchableOpacity
          style={styles.plusButton}
          onPress={openAddPlayerModal}
        >
          <Text style={{ fontSize: 16 }}>+</Text>
        </TouchableOpacity>
      </View>
      <MultiDropdown
        itemName="players"
        data={playerOptions}
        selected={selectedPlayers}
        setSelected={setSelectedPlayers}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 600,
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  plusButton: {
    backgroundColor: "pink",
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
