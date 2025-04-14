import { Game } from "./game";
import { Tag } from "./tag";

export type Player = {
    id: string;
    name: string;
    wins: number;
    bestGame: Game;
    favGame: Game;
    bestTag: Tag;
    mostLikelyWin: Tag;
};