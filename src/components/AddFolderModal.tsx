import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { InputData } from "./InputData";
import { SafeAreaView } from "react-native-safe-area-context";
import { CloseButton } from "./CloseButton";
import { SubmitButton } from "./SubmitButton";
import { ButtonText } from "./ButtonText";
import { FIREBASE_COLLECTIONS, generateFirebaseId } from "../firestore/utils";
import { Folder } from "../model/folder";
import { createFolderDocument } from "../services/folder";
import { useFolderContext } from "../contexts/FolderContext";

type AddFolderModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

export const AddFolderModal = (props: AddFolderModalProps) => {
  const { modalVisible, setModalVisible } = props;
  const [folderName, setFolderName] = useState("");
  const { refreshFolders } = useFolderContext();

  const closeModal = () => {
    setModalVisible(false);
  };

  const addFolder = async () => {
    const id = generateFirebaseId(FIREBASE_COLLECTIONS.FOLDER);

    const newFolder: Folder = {
      id,
      name: folderName,
      games: [],
    };

    await createFolderDocument(newFolder);
    refreshFolders();
    setFolderName("");
    setModalVisible(false); // later i could change this to some onError/onSuccess condition
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.centeredView}>
          <View style={styles.content}>
            <CloseButton onPress={closeModal} />

            <Text style={styles.label}> Folder Name: </Text>

            <InputData
              value={folderName}
              onChangeText={(text) => setFolderName(text)}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <SubmitButton
              child={<ButtonText text={"Add Folder"} />}
              onPress={addFolder}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    height: 180,
    width: 300,
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
    marginTop: 15,
    fontSize: 16,
    fontWeight: 600,
  },
});
