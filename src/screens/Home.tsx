import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AddPlayerModal } from "../components/AddPlayerModal";
import { ButtonText } from "../components/ButtonText";
import { RowContainer } from "../components/RowContainer";
import { getAllPlayers } from "../services/player";
import { Player } from "../model/player";
import { InfoPreviewBlock } from "../components/InfoPreviewBlock";

export const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState<Player[]>([]);

    const openAddPlayerModal = () => {
        setModalVisible(true)
    };

    // use useEffect to do something after component mounts (ex. fetch data)
    // reruns every time playerName changes so that it will get the new ones added
    useEffect(() => { 
        const fetchPlayers = async () => {
            const allPlayers = await getAllPlayers();
            setPlayers(allPlayers);
        };

        fetchPlayers();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.rowsContainer}>
                <RowContainer label={'Players'} 
                content={players}
                renderItem={(player) => (
                    <InfoPreviewBlock key={player.id} child={<Text>{player.name}</Text>} />
                )}/>
            </View>
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
    rowsContainer: {
        flex: 1,
        flexDirection: 'row'
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
