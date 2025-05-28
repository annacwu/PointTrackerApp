import { Folder } from "./folder";
import { Game } from "./game";
import { Tag } from "./tag";

export type GameContextType = {
  allFolders: Folder[];
  refreshFolders: () => void;
  allTags: Tag[];
  refreshTags: () => void;
  allGames: Game[];
  refreshGames: () => void;
};
