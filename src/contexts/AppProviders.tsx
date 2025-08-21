import React from "react";
import { GameProvider } from "./GameContext";
import { PlayerProvider } from "./PlayerContext";
import { FolderProvider } from "./FolderContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GameProvider>
        <PlayerProvider>
            <FolderProvider>
               {children} 
            </FolderProvider>
        </PlayerProvider>
    </GameProvider>
  );
};
