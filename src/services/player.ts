import { createDocumentWithId } from "../firestore/DocumentMutator";
import { FIREBASE_COLLECTIONS } from "../firestore/utils";
import { Player } from "../model/player";
import { getAllDocumentsWithPath } from "../firestore/DocumentRetriever";

export const createPlayerDocument = async (player: Player) => {
  await createDocumentWithId(FIREBASE_COLLECTIONS.PLAYER, player.id, player);
};

export const getAllPlayers = async () => {
  return await getAllDocumentsWithPath<Player>(FIREBASE_COLLECTIONS.PLAYER);
};
