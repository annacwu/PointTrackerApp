import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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


export const NewGame = () => {
    const { allPlayers, refreshPlayers, allFolders, refreshFolders, allTags, refreshTags } = useGameContext();
    const [gameName, setGameName] = useState('');
    const [playerModalVisible, setPlayerModalVisible] = useState(false);
    const [folderModalVisible, setFolderModalVisible] = useState(false);
    const [tagModalVisible, setTagModalVisible] = useState(false);

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

    const addGame = () => {

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
            <MultiDropdown itemName= "players" data={playerOptions} />

            <Spacing vertical={5} />
            <View style={styles.horizontal}>
                <Text style={styles.label}>Folder</Text>
                <Spacing horizontal={5} />
                <TouchableOpacity style={styles.plusButton} onPress={openAddFolderModal}>
                    <Text style={{fontSize: 16}}>+</Text>
                </TouchableOpacity> 
            </View>
            {/* TODO: this should actually be a single dropdown not multi*/}
            <SingleDropdown itemName= "folder" data={folderOptions} />
            
            <Spacing vertical={5} />
            <View style={styles.horizontal}>
                <Text style={styles.label}>Tags</Text>
                <Spacing horizontal={5} />
                <TouchableOpacity style={styles.plusButton} onPress={openAddTagModal}>
                    <Text style={{fontSize: 16}}>+</Text>
                </TouchableOpacity> 
            </View>
            <MultiDropdown itemName= "tags" data={tagOptions} />

            <Text style={styles.label}>Point Type</Text>

            <SubmitButton child={<ButtonText text={'Create Game'}/>} onPress={addGame} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
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
});