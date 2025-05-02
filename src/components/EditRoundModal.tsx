import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CloseButton } from "./CloseButton";
import { SubmitButton } from "./SubmitButton";
import { ButtonText } from "./ButtonText";
import { FIREBASE_COLLECTIONS, generateFirebaseId } from "../firestore/utils";
import { GamePlayer, Round } from "../model/game";
import { add } from "date-fns";

type EditRoundModalProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    round: Round;
    onSave: (roundId: string, updatedPoints: Record<string, number>) => void;
};

export const EditRoundModal = (props: EditRoundModalProps) => {
    const { modalVisible, setModalVisible, round, onSave } = props;
    const [roundPoints, setRoundPoints] = useState<Record<string, number>>(round.points);
    // so that it updates every time the round changes on first open
    useEffect(() => {
        setRoundPoints(round.points);
    }, [round]);

    const closeModal = () => {
        setRoundPoints(round.points)
        setModalVisible(false);
    };

    const saveRound =  async () => {
        round.points = roundPoints;
        onSave(round.id, round.points);
        closeModal();
    };

    const deleteRound = () => {

    };

    const addPoints = (player: GamePlayer) => {
        const updatedPoints = { ...roundPoints }; // copy state
        updatedPoints[player.id] += 1; 
        setRoundPoints(updatedPoints); 
    };

    const subtractPoints = (player: GamePlayer) => {
        const updatedPoints = { ...roundPoints }; // copy state
        updatedPoints[player.id] -= 1; 
        setRoundPoints(updatedPoints); 
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
                        <ScrollView style={styles.editView}>
                            {round.players.map(player => (
                                <View key={player.id} style={styles.playerView}>
                                    <Text style={styles.label}>{player.name}</Text>
                                    <Text style={styles.pointsInput}>{roundPoints[player.id]}</Text>
                                    <TouchableOpacity style={styles.pointsButton} onPress={() => addPoints(player)}>
                                        <ButtonText text="+" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.pointsButton} onPress={() => subtractPoints(player)}>
                                        <ButtonText text="-" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={styles.buttons}>
                            <SubmitButton child={<ButtonText text={'Delete'}/>} onPress={() => deleteRound()} customStyles={styles.deleteButton}/> 
                            <SubmitButton child={<ButtonText text={'Save'}/>} onPress={() => saveRound()} customStyles={{width: 120}}/> 
                        </View>
                        
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
        height: 280,
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
    editView: {
        width: 250,
    },  
    label: {
        margin: 5,
        fontSize: 16,
        fontWeight: 600,
        width: 100,
    },
    pointsInput: {
        margin: 5,
        fontSize: 16,
        width: 30,
    },
    playerView:{
        flexDirection: 'row',
    },
    buttons: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-evenly',
    },
    pointsButton: {
        width: 20,
        height: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        borderRadius: 10,
        margin: 2,
    },
    deleteButton: {
        borderColor: 'red',
        backgroundColor: 'white',
        borderWidth: 3,
        width: 120,
    },
});