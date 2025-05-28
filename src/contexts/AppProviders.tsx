import React from "react";
import { GameProvider } from "./GameContext";
import { PlayerProvider } from "./PlayerContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GameProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </GameProvider>
  );
};
