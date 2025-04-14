import { Game } from "./game";

export type Folder = {
    id: string;
    name: string;
    games: Game[];
};