import { createDocumentWithId } from "../firestore/DocumentMutator";
import { FIREBASE_COLLECTIONS } from "../firestore/utils";
import { Game } from "../model/game";
import { getAllDocumentsWithPath } from "../firestore/DocumentRetriever";

export const createGameDocument = async (game: Game) => {
  await createDocumentWithId(FIREBASE_COLLECTIONS.GAME, game.id, game);
};

export const getAllGames = async () => {
  const resp = await getAllDocumentsWithPath(FIREBASE_COLLECTIONS.GAME);
  return resp as Game[];
};
