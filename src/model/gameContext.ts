import { Folder } from "./folder";
import { Player } from "./player";

export type GameContextType = {
    allPlayers: Player[]
    refreshPlayers: () => void;
    allFolders: Folder[]
    refreshFolders: () => void;
};