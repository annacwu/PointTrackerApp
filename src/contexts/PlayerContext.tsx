import React, { createContext, useContext, useEffect, useState } from "react";
import { Player } from "../model/player";
import { PlayerContextType } from "../model/playerContext";
import { getAllPlayers } from "../services/player";
import { DropdownOption } from "../model/dropdown";

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined,
);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const refreshPlayers = async () => {
    const players = await getAllPlayers();
    if (players) {
      setAllPlayers(players);
    }
  };

  useEffect(() => {
    refreshPlayers();
  }, []);

  // turn into data to be shown in the dropdown
  const playerOptions: DropdownOption[] = allPlayers.map((player) => ({
    label: player.name,
    value: player,
  }));

  return (
    <PlayerContext.Provider
      value={{
        allPlayers,
        refreshPlayers,
        selectedPlayers,
        setSelectedPlayers,
        playerOptions,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  return context;
};
