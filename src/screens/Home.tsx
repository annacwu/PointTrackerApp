import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { AddPlayerModal } from "../components/AddPlayerModal";
import { ButtonText } from "../components/ButtonText";
import { RowContainer } from "../components/RowContainer";
import { InfoPreviewBlock } from "../components/InfoPreviewBlock";
import { Menu } from "../components/Menu";
import { useGameContext } from "../contexts/GameContext";
import { RootStackParamList } from "../../App";
import { Game } from "../model/game";

export const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { allPlayers, refreshPlayers, allGames, refreshGames } = useGameContext();
    const activeGames = allGames.filter((game) => game.active === true);

    const [playerModalVisible, setPlayerModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const openAddPlayerModal = () => {
        setPlayerModalVisible(true);
    };

    const openMenu = () => {
        setMenuVisible(true);
    };

    // navigation functions
    const moveToGameScreen = () => {
        setMenuVisible(false);
        navigation.navigate('NewGame');
    };

    const moveToActiveGameScreen = (game: Game) => {
        navigation.navigate('ActiveGame', { game });
    };

    const moveToPlayersScreen = () => {

    };

    const moveToAllGamesScreen = () => {

    };

    // use useEffect to do something after component mounts (ex. fetch data)
    // reruns every time playerName changes so that it will get the new ones added
    useEffect(() => { 
        refreshPlayers();
    }, [playerModalVisible]);

    useEffect(() => {
        refreshGames();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.rowsContainer}>
                <RowContainer label={'Ongoing'} 
                content={activeGames}
                renderItem={(game) => (
                    <InfoPreviewBlock key={game.id} child={<Text>{game.name}</Text>} onPress={() => moveToActiveGameScreen(game)}/>
                )}/>
            </View>
            <View style={styles.rowsContainer}>
                <RowContainer label={'Players'} 
                content={allPlayers}
                renderItem={(player) => (
                    <InfoPreviewBlock key={player.id} child={<Text>{player.name}</Text>} onPress={() => moveToPlayersScreen}/>
                )}/>
            </View>
            <View style={styles.rowsContainer}>
                <RowContainer label={'All Games'} 
                content={allGames}
                renderItem={(game) => (
                    <InfoPreviewBlock key={game.id} child={<Text>{game.name}</Text>} onPress={() => moveToAllGamesScreen}/>
                )}/>
            </View>
            
            <AddPlayerModal 
                modalVisible={playerModalVisible}
                setModalVisible={setPlayerModalVisible}
            />

                {menuVisible && (
                    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
                        <View style={styles.overlay}>
                            <View style={styles.menuView}>
                                <Menu
                                    newGamePress={moveToGameScreen}
                                    addPlayersPress={openAddPlayerModal}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                
                <TouchableOpacity style={styles.newItemButton} onPress={openMenu}>
                    <ButtonText text="+"/>
                </TouchableOpacity>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    rowsContainer: {
        height: 225,
        flexDirection: 'row',
    },
    newItemButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    // actionsView: {
    //     backgroundColor: 'red',
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center', 
    // },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0)', // transparent touch area
        zIndex: 10,
    },
    menuView: {
        position: 'absolute',
        bottom: 100, // adjust based on how far above the button you want it
        right: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: 10,
        elevation: 5,
        zIndex: 10,
    }
});
