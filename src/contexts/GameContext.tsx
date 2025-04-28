import React, { createContext, useContext, useEffect, useState } from "react";
import { Player } from "../model/player";
import { GameContextType } from "../model/gameContext";
import { getAllPlayers } from "../services/player";
import { Folder } from "../model/folder";
import { getAllFolders } from "../services/folder";
import { Tag } from "../model/tag";
import { getAllTags } from "../services/tag";
import { Game } from "../model/game";
import { getAllGames } from "../services/game";

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({children}: { children: React.ReactNode }) => {
    const [allPlayers, setPlayers] = useState<Player[]>([]);
    const [allFolders, setFolders] = useState<Folder[]>([]);
    const [allTags, setTags] = useState<Tag[]>([]);
    const [allGames, setGames] = useState<Game[]>([]);

    // TODO: add proper error handling to this guy
    const fetchPlayers = async () => {
        const players = await getAllPlayers();
        setPlayers(players);
    };

    const fetchFolders = async () => {
        const folders = await getAllFolders();
        setFolders(folders);
    };

    const fetchTags = async () => {
        const tags = await getAllTags();
        setTags(tags);
    };

    const fetchGames = async () => {
        const games = await getAllGames();
        setGames(games);
    };

    useEffect(() => {
        fetchPlayers();
        fetchFolders();
        fetchTags();
        fetchGames();
    }, []);

    return (
        <GameContext.Provider value={{ allPlayers, refreshPlayers: fetchPlayers, allFolders, refreshFolders: fetchFolders, allTags, refreshTags: fetchTags, allGames, refreshGames: fetchGames }} >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGameContext must be used within a GameProvider");
    return context;
  };