import React, { createContext, useContext, useEffect, useState } from "react";
import { GameContextType } from "../model/gameContext";
import { Folder } from "../model/folder";
import { getAllFolders } from "../services/folder";
import { Tag } from "../model/tag";
import { getAllTags } from "../services/tag";
import { Game } from "../model/game";
import { getAllGames } from "../services/game";

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [allFolders, setFolders] = useState<Folder[]>([]);
  const [allTags, setTags] = useState<Tag[]>([]);
  const [allGames, setGames] = useState<Game[]>([]);

  const fetchFolders = async () => {
    const folders = await getAllFolders();
    if (folders) {
      setFolders(folders);
    }
  };

  const fetchTags = async () => {
    const tags = await getAllTags();
    if (tags) {
      setTags(tags);
    }
  };

  const fetchGames = async () => {
    const games = await getAllGames();
    if (games) {
      setGames(games);
    }
  };

  useEffect(() => {
    fetchFolders();
    fetchTags();
    fetchGames();
  }, []);

  return (
    <GameContext.Provider
      value={{
        allFolders,
        refreshFolders: fetchFolders,
        allTags,
        refreshTags: fetchTags,
        allGames,
        refreshGames: fetchGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context)
    throw new Error("useGameContext must be used within a GameProvider");
  return context;
};
