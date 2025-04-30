import React from "react";
import { GamePlayer, Round } from "../model/game";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

type PointsTableProps = {
    players: GamePlayer[];  
    rounds: Round[];
    onEdit: () => void;
};

export const PointsTable = (props: PointsTableProps) => {
    const { players, rounds, onEdit } = props;

    return (
        <View style={styles.tableContainer}>
        {/* Player header row */}
        <View style={styles.headerRow}>
            <Text style={styles.roundLabelHeader}>Round</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontal}>
                {players.map(player => (
                <Text key={player.id} style={styles.headerCell}>{player.name}</Text>
                ))}
                <Text style={styles.editHeaderSpacer}></Text>
            </View>
            </ScrollView>
        </View>

        {/* Rounds and points */}
        <ScrollView style={styles.roundsContainer}>
            {rounds.map((round, roundIndex) => (
            <View key={round.id} style={styles.row}>
                {/* Round label (R1, R2...) */}
                <Text style={styles.roundLabel}>R{roundIndex + 1}</Text>

                {/* Horizontal scrollable points row */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.horizontal}>
                    {players.map(player => (
                    <Text key={player.id} style={styles.cell}>
                        {round.points[player.id] ?? 0}
                    </Text>
                    ))}
                    <TouchableOpacity onPress={() => onEdit()}>
                        <Image source={require('../../assets/edit.png')} style={styles.editImage} />
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
            ))}
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    roundLabelHeader: {
        width: 40,
        fontWeight: 'bold',
    },
    roundLabel: {
        width: 40,
        textAlign: 'center',
        paddingVertical: 10,
    },
    roundsContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerCell: {
        width: 75,
        textAlign: 'center',
        fontWeight: '600',
    },
    cell: {
        width: 75,
        textAlign: 'center',
        paddingVertical: 10,
    },
    editImage: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    editHeaderSpacer: {
        width: 30, // Reserve space in header to align with edit icon
    },
});