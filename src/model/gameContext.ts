import { Folder } from "./folder";
import { Game } from "./game";
import { Player } from "./player";
import { Tag } from "./tag";

export type GameContextType = {
  allPlayers: Player[];
  refreshPlayers: () => void;
  allFolders: Folder[];
  refreshFolders: () => void;
  allTags: Tag[];
  refreshTags: () => void;
  allGames: Game[];
  refreshGames: () => void;
};
