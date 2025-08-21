import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InputData } from "../components/InputData";
import { SubmitButton } from "../components/SubmitButton";
import { ButtonText } from "../components/ButtonText";
import MultiDropdown from "../components/MultiDropdown";
import { DropdownOption } from "../model/dropdown";
import { useGameContext } from "../contexts/GameContext";
import { Spacing } from "../components/Spacing";
import { AddTagModal } from "../components/AddTagModal";
import { FIREBASE_COLLECTIONS, generateFirebaseId } from "../firestore/utils";
import ButtonMultiselect, {
  ButtonLayout,
} from "react-native-button-multiselect";
import { Game, GamePlayer, POINT_TYPES } from "../model/game";
import { Tag } from "../model/tag";
import { createGameDocument } from "../services/game";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { parseDateToString } from "../utils/date";
import { PlayerSelection } from "../components/PlayerSelection";
import { usePlayerContext } from "../contexts/PlayerContext";
import { useFolderContext } from "../contexts/FolderContext";
import { FolderSelection } from "../components/FolderSelection";

export const NewGame = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { allTags, refreshTags } = useGameContext();
  const { selectedPlayers, setSelectedPlayers } = usePlayerContext();
  const { selectedFolder, setSelectedFolder } = useFolderContext();

  const todayDate = parseDateToString(Date.now());

  const [gameName, setGameName] = useState(`New Game - ${todayDate}`);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [pointType, setPointType] = useState(POINT_TYPES.MOST);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // useEffects so that the new items are available right after added
  useEffect(() => {
    refreshTags();
  }, [tagModalVisible]);

  const tagOptions: DropdownOption[] = allTags.map((tag) => ({
    label: tag.name,
    value: tag,
  }));

  const handleButtonSelected = (selectedValues: string) => {
    setPointType(selectedValues as POINT_TYPES);
  };

  // TODO: add error handling in this so people can't make empty games
  const addGame = async () => {
    const gamePlayers: GamePlayer[] = selectedPlayers.map((player) => ({
      id: player.id,
      name: player.name,
      totalPoints: 0,
    }));

    const newGame: Game = {
      id: generateFirebaseId(FIREBASE_COLLECTIONS.GAME),
      name: gameName,
      players: gamePlayers,
      rounds: [],
      active: true,
      pointType: pointType,
      tags: selectedTags,
      dateStarted: Date.now(),
    };

    // FIXME: this is not working now
    if (selectedFolder !== undefined) {
      selectedFolder.games.push(newGame);
    }

    await createGameDocument(newGame);
    setSelectedPlayers([]);
    setSelectedFolder(undefined);
    setSelectedTags([]);
    setPointType(POINT_TYPES.MOST);

    navigation.navigate("Home");
  };


  const openAddTagModal = () => {
    setTagModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
        <PlayerSelection />

        <Spacing vertical={5} />
        <FolderSelection /> 

        <Spacing vertical={5} />
        <View style={styles.horizontal}>
          <Text style={styles.label}>Tags</Text>
          <Spacing horizontal={5} />
          <TouchableOpacity style={styles.plusButton} onPress={openAddTagModal}>
            <Text style={{ fontSize: 16 }}>+</Text>
          </TouchableOpacity>
        </View>
        <MultiDropdown
          itemName="tags"
          data={tagOptions}
          selected={selectedTags}
          setSelected={setSelectedTags}
        />

        <Text style={styles.label}>Winner</Text>
        <Spacing vertical={5} />
        <ButtonMultiselect
          buttons={[
            { label: "Most points", value: POINT_TYPES.MOST },
            { label: "Least points", value: POINT_TYPES.LEAST },
          ]}
          layout={ButtonLayout.FULL_WIDTH}
          onButtonSelected={handleButtonSelected}
          selectedButtons={pointType}
        />
      </ScrollView>

      {/* TODO: make it so this button can't be selected if not all info filled in */}
      <View style={styles.submit}>
        <SubmitButton
          child={<ButtonText text={"Create Game"} />}
          onPress={addGame}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    flexDirection: "row",
    alignItems: "center",
  },
  plusButton: {
    backgroundColor: "pink",
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  submit: {
    bottom: 30,
  },
});
