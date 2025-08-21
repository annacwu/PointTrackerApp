import React, { createContext, useContext, useEffect, useState } from "react";
import { Folder } from "../model/folder";
import { FolderContextType } from "../model/folderContext";
import { getAllFolders } from "../services/folder";
import { DropdownOption } from "../model/dropdown";

export const FolderContext = createContext<FolderContextType | undefined>(
  undefined,
);

export const FolderProvider = ({ children }: { children: React.ReactNode }) => {
  const [allFolders, setAllFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder>();

  const refreshFolders = async () => {
    const folders = await getAllFolders();
    if (folders) {
      setAllFolders(folders);
    }
  };

  useEffect(() => {
    refreshFolders();
  }, []);

  // turn into data to be shown in the dropdown
  const folderOptions: DropdownOption[] = allFolders.map((folder) => ({
    label: folder.name,
    value: folder,
  }));

  return (
    <FolderContext.Provider
      value={{
        allFolders,
        refreshFolders,
        selectedFolder,
        setSelectedFolder,
        folderOptions,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (!context)
    throw new Error("useFolderContext must be used within a FolderProvider");
  return context;
};
