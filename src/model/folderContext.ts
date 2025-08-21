import { DropdownOption } from "./dropdown";
import { Folder } from "./folder";

export type FolderContextType = {
  allFolders: Folder[];
  refreshFolders: () => void;
  selectedFolder: Folder | undefined;
  setSelectedFolder: (folder: Folder | undefined) => void;
  folderOptions: DropdownOption[];
};
