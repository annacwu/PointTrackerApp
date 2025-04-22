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

type RootStackParamList = {
    Home: undefined;
    NewGame: undefined;
};

export const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { allPlayers, refreshPlayers } = useGameContext();

    const [playerModalVisible, setPlayerModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [playerName, setPlayerName] = useState('');

    const openAddPlayerModal = () => {
        setPlayerModalVisible(true);
    };

    const openMenu = () => {
        setMenuVisible(true);
    };

    const moveToGameScreen = () => {
        setMenuVisible(false);
        navigation.navigate('NewGame');
    };

    // use useEffect to do something after component mounts (ex. fetch data)
    // reruns every time playerName changes so that it will get the new ones added
    useEffect(() => { 
        refreshPlayers();
    }, [playerName]);

    return (
        <View style={styles.container}>
            <View style={styles.rowsContainer}>
                <RowContainer label={'Players'} 
                content={allPlayers}
                renderItem={(player) => (
                    <InfoPreviewBlock key={player.id} child={<Text>{player.name}</Text>} />
                )}/>
            </View>
            <AddPlayerModal 
                modalVisible={playerModalVisible}
                playerName={playerName}
                setPlayerName={setPlayerName}
                setModalVisible={setPlayerModalVisible}
            />

            <View style={styles.actionsView}>
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

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    rowsContainer: {
        flex: 1,
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
    actionsView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
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
