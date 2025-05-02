import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Spacing } from "../components/Spacing";
import { Round } from "../model/game";
import { FIREBASE_COLLECTIONS, generateFirebaseId } from "../firestore/utils";
import { RowContainer } from "../components/RowContainer";
import { updateDocument } from "../firestore/DocumentMutator";
import { useGameContext } from "../contexts/GameContext";
import { PointsTable } from "../components/PointsTable";
import { EditRoundModal } from "../components/EditRoundModal";

export type ActiveGameProps = NativeStackScreenProps<RootStackParamList, 'ActiveGame'>;

export const ActiveGame = ({ route }: ActiveGameProps) => {
    const { game: initialGame } = route.params;
    const {allGames, refreshGames} = useGameContext();
    const [game, setGame] = useState(initialGame);
    const [avgPoints, setAvgPoints] = useState<number[]>([]);
    const [roundModalVisible, setRoundModalVisible] = useState(false);
    const [currentRound, setCurrentRound] = useState<Round>(game.rounds[0]);

    useEffect(() => {
        const updatedGame = allGames.find(g => g.id === game.id);
        if (updatedGame) {
            setGame(updatedGame);
        }
    }, [allGames]);

    // check this might not be working
    useEffect(() => {
        calculateAverages();
    }, [roundModalVisible]); 

    const addRound = async () => {
        const points: Record<string, number> = {};
        game.players.forEach(player => {
            points[player.id] = 0;
        });

        const newRound: Round = {
            id: generateFirebaseId(`${FIREBASE_COLLECTIONS.GAME}/${game.id}/rounds`),
            players: game.players,
            points: points,
            dateAdded: Date.now()
        }

        const updatedRounds = [...game.rounds, newRound];

        await updateDocument(FIREBASE_COLLECTIONS.GAME, game.id, {
            rounds: updatedRounds
        });
        
        refreshGames();
    };

    const saveRoundChanges = async (roundId: string, updatedPoints: Record<string, number>) => {
        const updatedRounds = game.rounds.map(r =>
            r.id === roundId ? { ...r, points: updatedPoints } : r
        );
        await updateDocument(FIREBASE_COLLECTIONS.GAME, game.id, { rounds: updatedRounds });
        refreshGames();
    };

    const openRoundModal = (round: Round) => {
        setCurrentRound(round)
        setRoundModalVisible(true);
    };

    const moveToPlayersScreen = () => {

    };

    const calculateAverages = () => {
        
        const points: number[] = [];
        game.players.map((player) => {
            if (game.rounds.length === 0) {
                points.push(0)
            } else {
                points.push(player.totalPoints / game.rounds.length)
            }
            
        });
        setAvgPoints(points);
    };

    return (
        <View style={styles.container}>

            <EditRoundModal 
                modalVisible={roundModalVisible}
                setModalVisible={setRoundModalVisible}
                round={currentRound}
                onSave={(roundID, updatedPoints: Record<string, number>) => saveRoundChanges(roundID, updatedPoints)}
            />

            {/* Header with total player points for the game */}
            <View style={styles.header}> 
                <RowContainer label={'Total Points'} 
                    content={game.players}
                    renderItem={(player) => (
                        <View key={player.id} style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.player}>
                                <Text>{player.name}</Text>
                                <Spacing vertical={5} />
                                <Text>{player.totalPoints}</Text>
                            </TouchableOpacity>

                            <Spacing horizontal={5} />
                        </View>

                        )}
                    heading={false}
                    customStyles={{justifyContent: 'space-evenly'}}
                />
            </View>

            {/* List of rounds played with points per round */}
            <View style={styles.rounds}>

                {/* Round Header */}
                <View style={styles.sectionTitle}>
                    <Text style={styles.label}>Rounds</Text> 
                    <TouchableOpacity style={styles.newRound} onPress={() => addRound()}>
                        <Text style={styles.smallText}>+ Add Round</Text>
                    </TouchableOpacity>
                </View>

                {/* Points Table */}
                <View style={styles.table}>
                    <PointsTable 
                    players={game.players}
                    rounds={game.rounds}
                    onEdit={openRoundModal} 
                    averages={avgPoints}/>
                </View>
                
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 100,
    },
    rounds: {
        flex: 1,
        width: '100%',
    },
    label: {
        padding: 5,
        fontSize: 20,
        fontWeight: 600,
    },
    player: {
        backgroundColor: 'pink',
        height: 75,
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    sectionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newRound: {
        margin: 5,
        width: 100,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    smallText: {
        fontSize: 14,
    },
    table: {
        flex: 1,
        marginLeft: 5,
    },
});