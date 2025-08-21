import React, { useState } from "react";
import { useFolderContext } from "../contexts/FolderContext";
import { AddFolderModal } from "./AddFolderModal";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Spacing } from "./Spacing";
import SingleDropdown from "./SingleDropdown";

export const FolderSelection = () => {
  const { selectedFolder, setSelectedFolder, folderOptions } =
    useFolderContext();

  const [folderModalVisible, setFolderModalVisible] = useState(false);

  const openAddFolderModal = () => {
    setFolderModalVisible(true);
  };

  return (
    <>
      <AddFolderModal
        modalVisible={folderModalVisible}
        setModalVisible={setFolderModalVisible}
      />
      <View style={styles.horizontal}>
        <Text style={styles.label}>Folder</Text>
        <Spacing horizontal={5} />
        <TouchableOpacity
          style={styles.plusButton}
          onPress={openAddFolderModal}
        >
          <Text style={{ fontSize: 16 }}>+</Text>
        </TouchableOpacity>
      </View>
      <SingleDropdown
        itemName="folder"
        data={folderOptions}
        selected={selectedFolder}
        setSelected={setSelectedFolder}
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
