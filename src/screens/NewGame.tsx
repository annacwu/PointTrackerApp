import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputData } from "../components/InputData";
import { SubmitButton } from "../components/SubmitButton";
import { ButtonText } from "../components/ButtonText";
import MultiDropdown from "../components/MultiDropdown";
import { DropdownOption } from "../model/dropdown";
import { useGameContext } from "../contexts/GameContext";
import { Spacing } from "../components/Spacing";
import { AddPlayerModal } from "../components/AddPlayerModal";
import { AddFolderModal } from "../components/AddFolderModal";
import SingleDropdown from "../components/SingleDropdown";
import { AddTagModal } from "../components/AddTagModal";
import { FIREBASE_COLLECTIONS, generateFirebaseId } from "../firestore/utils";
import ButtonMultiselect, { ButtonLayout } from "react-native-button-multiselect";
import { Game, GamePlayer, POINT_TYPES } from "../model/game";
import { Player } from "../model/player";
import { Tag } from "../model/tag";
import { Folder } from "../model/folder";


export const NewGame = () => {
    const { allPlayers, refreshPlayers, allFolders, refreshFolders, allTags, refreshTags } = useGameContext();
    const [gameName, setGameName] = useState('');
    const [playerModalVisible, setPlayerModalVisible] = useState(false);
    const [folderModalVisible, setFolderModalVisible] = useState(false);
    const [tagModalVisible, setTagModalVisible] = useState(false);
    const [pointType, setPointType] = useState('');

    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<Folder>();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    // useEffects so that the new items are available right after added
    useEffect(() => { 
        refreshPlayers();
    }, [playerModalVisible]);

    useEffect(() => {
        refreshFolders();
    }, [folderModalVisible]);

    useEffect(() => {
        refreshTags();
    }, [tagModalVisible]);

    // turn into data to be shown in the dropdown
    const playerOptions: DropdownOption[] = allPlayers.map(player => ({
        label: player.name,
        value: player.id,
    }));

    const folderOptions: DropdownOption[] = allFolders.map(folder => ({
        label: folder.name,
        value: folder.id,
    }));

    const tagOptions: DropdownOption[] = allTags.map(tag => ({
        label: tag.name,
        value: tag.id,
    }));

    const handleButtonSelected = (selectedValues: string) => {
        setPointType(selectedValues);
    };

    const addGame = () => {
        const gamePlayers: GamePlayer[] = selectedPlayers.map(player => ({
            id: player.id,
            totalPoints: 0,
            roundPoints: 0,
        })) 

        const newGame: Game = {
            id: generateFirebaseId(FIREBASE_COLLECTIONS.GAME),
            name: gameName,
            players: gamePlayers,
            rounds: [],
            active: true,
            pointType: pointType,
            tags: selectedTags,
            dateStarted: Date.now(),
        }
        console.log(newGame)
        
        if (selectedFolder) {
            selectedFolder.games.push(newGame);
            console.log(`game added to ${selectedFolder}`);
        };
    };

    const openAddPlayerModal = () => {
        setPlayerModalVisible(true);
    };

    const openAddFolderModal = () => {
        setFolderModalVisible(true);
    };

    const openAddTagModal = () => {
        setTagModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <AddPlayerModal 
                modalVisible={playerModalVisible}
                setModalVisible={setPlayerModalVisible}
                />

                <AddFolderModal 
                    modalVisible={folderModalVisible}
                    setModalVisible={setFolderModalVisible}
                />

                <AddTagModal 
                    modalVisible={tagModalVisible}
                    setModalVisible={setTagModalVisible}
                />

                <Spacing vertical={5} />
                <Text style={styles.label}>Game Name</Text>
                <InputData 
                    value={gameName}
                    onChangeText={(text) => setGameName(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Spacing vertical={5} />
                <View style={styles.horizontal}>
                    <Text style={styles.label}>Players</Text>
                    <Spacing horizontal={5} />
                    <TouchableOpacity style={styles.plusButton} onPress={openAddPlayerModal}>
                        <Text style={{fontSize: 16}}>+</Text>
                    </TouchableOpacity> 
                </View>
                <MultiDropdown itemName= "players" data={playerOptions} selected={selectedPlayers} setSelected={setSelectedPlayers} />

                <Spacing vertical={5} />
                <View style={styles.horizontal}>
                    <Text style={styles.label}>Folder</Text>
                    <Spacing horizontal={5} />
                    <TouchableOpacity style={styles.plusButton} onPress={openAddFolderModal}>
                        <Text style={{fontSize: 16}}>+</Text>
                    </TouchableOpacity> 
                </View>
                <SingleDropdown itemName= "folder" data={folderOptions} selected={selectedFolder} setSelected={setSelectedFolder}/>
                
                <Spacing vertical={5} />
                <View style={styles.horizontal}>
                    <Text style={styles.label}>Tags</Text>
                    <Spacing horizontal={5} />
                    <TouchableOpacity style={styles.plusButton} onPress={openAddTagModal}>
                        <Text style={{fontSize: 16}}>+</Text>
                    </TouchableOpacity> 
                </View>
                <MultiDropdown itemName= "tags" data={tagOptions} selected={selectedTags} setSelected={setSelectedTags}/>

                <Text style={styles.label}>Winner</Text>
                <Spacing vertical={5} />
                <ButtonMultiselect
                    buttons={[{label: 'Most points', value: POINT_TYPES.MOST}, {label: 'Least points', value: POINT_TYPES.LEAST},]}
                    layout={ButtonLayout.FULL_WIDTH}
                    onButtonSelected={handleButtonSelected}
                    selectedButtons={pointType}
                />
            </ScrollView>

{/* TODO: make it so this button can't be selected if not all info filled in */}
            <View style={styles.submit}>
                <SubmitButton child={<ButtonText text={'Create Game'}/>} onPress={addGame} />
            </View> 
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    scrollView: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 600,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    plusButton: {
        backgroundColor: 'pink',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    submit: {
        bottom: 30,
    },
});