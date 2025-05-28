import { createDocumentWithId } from "../firestore/DocumentMutator";
import { FIREBASE_COLLECTIONS } from "../firestore/utils";
import { getAllDocumentsWithPath } from "../firestore/DocumentRetriever";
import { Folder } from "../model/folder";

export const createFolderDocument = async (folder: Folder) => {
  await createDocumentWithId(FIREBASE_COLLECTIONS.FOLDER, folder.id, folder);
};

export const getAllFolders = async () => {
  return await getAllDocumentsWithPath<Folder>(FIREBASE_COLLECTIONS.FOLDER);
};
