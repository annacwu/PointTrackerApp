import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AddPlayerModal } from "../components/AddPlayerModal";
import { ButtonText } from "../components/ButtonText";

export const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [playerName, setPlayerName] = useState('');

    const openAddPlayerModal = () => {
        setModalVisible(true)
    };

    return (
        <View style={styles.container}>
            <AddPlayerModal 
                modalVisible={modalVisible}
                playerName={playerName}
                setPlayerName={setPlayerName}
                setModalVisible={setModalVisible}
            />

            <TouchableOpacity style={styles.addPlayerButton} onPress={openAddPlayerModal}>
                <ButtonText text="+"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addPlayerButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center', 
    }
});
