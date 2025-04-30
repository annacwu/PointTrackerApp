import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Spacing } from "../components/Spacing";
import { Round } from "../model/game";
import { FIREBASE_COLLECTIONS, generateFirebaseId } from "../firestore/utils";
import { BORDER_LIGHT_GREY } from "../utils/colors";
import { RowContainer } from "../components/RowContainer";
import { updateDocument } from "../firestore/DocumentMutator";
import { useGameContext } from "../contexts/GameContext";
import { PointsTable } from "../components/PointsTable";

export type ActiveGameProps = NativeStackScreenProps<RootStackParamList, 'ActiveGame'>;

export const ActiveGame = ({ route }: ActiveGameProps) => {
    const { game: initialGame } = route.params;
    const {allGames, refreshGames} = useGameContext();
    const [game, setGame] = useState(initialGame);
    const [avgPoints, setAvgPoints] = useState<number[]>([]);

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

    const moveToPlayersScreen = () => {

    };

    const handleEditPress = () => {

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

    useEffect(() => {
        const updatedGame = allGames.find(g => g.id === game.id);
        if (updatedGame) {
            setGame(updatedGame);
        }
    }, [allGames]);

    useEffect(() => {
        calculateAverages();
    }, [game]); 
    // whenever game updates, recalculate NOT WORKING?

    return (
        <View style={styles.container}>
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

            {/* List of rounds played with points per round 
            TODO: make whole thing a horizontal scrollview, each column should be a player view 
            with their points. add side players/round number column?
            */}
            <View style={styles.rounds}>
                <View style={styles.sectionTitle}>
                    <Text style={styles.label}>
                        Rounds
                    </Text> 
                    <TouchableOpacity style={styles.newRound} onPress={addRound}>
                        <Text style={styles.smallText}>+ Add Round</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.table}>
                    <View style={styles.horizontal}>
                      {game.players.map(player => 
                        <Text key={player.id}>{player.name}</Text>
                        )}  
                    </View>
                    
                    <View style={styles.separator} />

                    <ScrollView contentContainerStyle={styles.roundDisplay} >
                      {game.rounds.map(round => 
                        <View key={round.id} style={styles.horizontal}>{round.players.map(player =>
                            <Text key={player.id}>pts</Text>
                        )}</View>
                        )}  
                        <TouchableOpacity onPress={handleEditPress}>
                            <Image source={require('../../assets/edit.png')} style={styles.editImage} />
                        </TouchableOpacity>
                    </ScrollView> */}
                    <View style={styles.table}>
                        <PointsTable 
                    players={game.players}
                    rounds={game.rounds}
                    onEdit={handleEditPress} />
                    </View>
                    
                    {/* average points separator */}
                    <View style={styles.separator} /> 

                    <View style={styles.horizontal}>
                      {avgPoints.map((points, index) => 
                        <Text key={index}>{points}</Text>
                        )}  
                        
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
        // backgroundColor: 'red',
        height: 100,
    },
    rounds: {
        // backgroundColor: 'orange',
        height: 450,
        width: '100%',
    },
    footer: {
        backgroundColor: 'yellow',
        height: 175,
        width: '100%',
    },
    label: {
        padding: 5,
        fontSize: 20,
        fontWeight: 600,
    },
    playerDisplay: {
        backgroundColor: 'white',
        padding: 5,
        margin: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
        // backgroundColor: 'pink',
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
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
    },
    table: {
        backgroundColor: 'red',
        flex: 1,
        margin: 5,
        borderRadius: 15,
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: BORDER_LIGHT_GREY,
    },
    roundDisplay: {},
    roundInfo: {
        justifyContent: 'space-evenly',
    },
    editImage: {
        height: 20,
        width: 20,
    },
});