import React from "react";
import { GamePlayer, Round } from "../model/game";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BORDER_LIGHT_GREY } from "../utils/colors";
import { Spacing } from "./Spacing";

type PointsTableProps = {
  players: GamePlayer[];
  rounds: Round[];
  onEdit: (round: Round) => void;
  averages: number[];
};

export const PointsTable = (props: PointsTableProps) => {
  const { players, rounds, onEdit, averages } = props;

  return (
    <View style={styles.container}>
      {/* Horizontally scrollable wrapper for header and body together */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Spacing horizontal={22} />
            {players.map((player) => (
              <Text key={player.id} style={styles.playerName}>
                {player.name}
              </Text>
            ))}
          </View>

          {/* Vertically scrollable list of rounds */}
          <View style={styles.roundsContainer}>
            <ScrollView>
              {rounds.map((round, index) => (
                <View key={round.id} style={styles.roundRow}>
                  {/* Round label */}
                  <TouchableOpacity onPress={() => onEdit(round)}>
                    <Text style={styles.roundButton}>R{index + 1}</Text>
                  </TouchableOpacity>

                  {/* Player points */}
                  {players.map((player) => (
                    <Text key={player.id} style={styles.pointCell}>
                      {round.points[player.id] ?? 0}
                    </Text>
                  ))}
                </View>
              ))}
            </ScrollView>

            {/* average points row */}
            <View style={styles.averageRow}>
              <Text style={styles.label}>Avg</Text>
              {averages.map((num, index) => (
                <Text key={index} style={styles.playerName}>
                  {num}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    flex: 1,
    minWidth: "99%",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: BORDER_LIGHT_GREY,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  playerName: {
    width: 80,
    textAlign: "center",
    fontWeight: "bold",
  },
  roundsContainer: {
    maxHeight: "90%",
  },
  roundRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-evenly",
  },
  roundButton: {
    width: 40,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "pink",
    borderRadius: 5,
    margin: 2,
  },
  label: {
    width: 40,
    textAlign: "center",
    fontWeight: "bold",
    margin: 2,
  },
  pointCell: {
    width: 80,
    textAlign: "center",
  },
  averageRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderColor: BORDER_LIGHT_GREY,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 40,
  },
});
