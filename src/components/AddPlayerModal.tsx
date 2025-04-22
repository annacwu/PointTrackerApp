import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { InputData } from "./InputData";
import { SafeAreaView } from "react-native-safe-area-context";
import { BORDER_LIGHT_GREY } from "../utils/colors";
import { CloseButton } from "./CloseButton";
import { SubmitButton } from "./SubmitButton";
import { ButtonText } from "./ButtonText";
import { FIREBASE_COLLECTIONS, generateFirebaseId } from "../firestore/utils";
import { Player } from "../model/player";
import { createPlayerDocument, getAllPlayers } from "../services/player";

type AddPlayerModalProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};

export const AddPlayerModal = (props: AddPlayerModalProps) => {
    const { modalVisible, setModalVisible } = props;
    const [playerName, setPlayerName] = useState('');

    const closeModal = () => {
        setModalVisible(false);
    };

    const addPlayer = async () => {
        const id = generateFirebaseId(FIREBASE_COLLECTIONS.PLAYER);

        const newPlayer: Player = {
            id,
            name: playerName,
            wins: 0,
            createdDate: Date.now(),
        };

        await createPlayerDocument(newPlayer);
        setPlayerName('');
        setModalVisible(false); // later i could change this to some onError/onSuccess condition
    };

    return (
        <Modal 
        visible={modalVisible} 
        animationType="slide" 
        transparent={true}
        >
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.centeredView}>
                    <View style={styles.content}>
                        <CloseButton onPress={closeModal}/>

                        <Text style={styles.label}> Player Name: </Text>

                        <InputData 
                        value={playerName}
                        onChangeText={(text) => setPlayerName(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />

                       <SubmitButton child={<ButtonText text={'Add Player'}/>} onPress={addPlayer} /> 
                    </View>
                </View>
                
            </SafeAreaView>
        </Modal>
        
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 180,
        width: 300,
        padding: 10,
        shadowColor: '#000',
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