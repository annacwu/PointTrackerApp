import { createDocumentWithId } from "../firestore/DocumentMutator";
import { FIREBASE_COLLECTIONS } from "../firestore/utils";
import { getAllDocumentsWithPath } from "../firestore/DocumentRetriever";
import { Tag } from "../model/tag";

export const createTagDocument = async (tag: Tag) => {
  await createDocumentWithId(FIREBASE_COLLECTIONS.TAG, tag.id, tag);
};

export const getAllTags = async () => {
  return await getAllDocumentsWithPath<Tag>(FIREBASE_COLLECTIONS.TAG);
};
