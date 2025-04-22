import { Folder } from "./folder";
import { Player } from "./player";
import { Tag } from "./tag";

export type GameContextType = {
    allPlayers: Player[]
    refreshPlayers: () => void;
    allFolders: Folder[]
    refreshFolders: () => void;
    allTags: Tag[]
    refreshTags: () => void;
};