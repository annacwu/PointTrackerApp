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
import { createGameDocument } from "../services/game";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { parseDateToString } from "../utils/date";

export const NewGame = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { allPlayers, refreshPlayers, allFolders, refreshFolders, allTags, refreshTags } = useGameContext();

    const todayDate = parseDateToString(Date.now())

    const [gameName, setGameName] = useState(`New Game - ${todayDate}`);
    const [playerModalVisible, setPlayerModalVisible] = useState(false);
    const [folderModalVisible, setFolderModalVisible] = useState(false);
    const [tagModalVisible, setTagModalVisible] = useState(false);
    const [pointType, setPointType] = useState(POINT_TYPES.MOST);

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
        value: player,
    }));

    const folderOptions: DropdownOption[] = allFolders.map(folder => ({
        label: folder.name,
        value: folder,
    }));

    const tagOptions: DropdownOption[] = allTags.map(tag => ({
        label: tag.name,
        value: tag,
    }));

    const handleButtonSelected = (selectedValues: string) => {
        setPointType(selectedValues as POINT_TYPES);
    };

// TODO: add error handling in this so people can't make empty games
    const addGame = async () => {
        const gamePlayers: GamePlayer[] = selectedPlayers.map(player => ({
            id: player.id,
            name: player.name,
            totalPoints: 0,
            roundPoints: 0,
        })) 

        console.log(`players: ${selectedPlayers}, folder: ${selectedFolder}, tags: ${selectedTags}`);

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
        
        if (selectedFolder !== undefined) {
            selectedFolder.games.push(newGame);
        };

        await createGameDocument(newGame);
        setSelectedPlayers([]);
        setSelectedFolder(undefined);
        setSelectedTags([]);
        setPointType(POINT_TYPES.MOST);

        navigation.navigate('Home');
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