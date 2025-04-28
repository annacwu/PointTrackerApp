import { Tag } from "./tag";

/* there are Players the user can add to the global store and choose from
when making a new game, and when added to the game it makes an instance
of that player connected to the game to keep track of game-specific info
*/
export type GamePlayer = {
    id: string; // this should be the same as the global player
    totalPoints: number;
    roundPoints: number;
};

export type Round = {
    id: string;
    players: GamePlayer[]
    points: number;
};

export type Game = {
    id: string;
    name: string;
    players: GamePlayer[]
    rounds: Round[]
    pointType: POINT_TYPES;
    active: boolean;
    tags: Tag[]

    dateStarted: number;
    dateEnded?: number;
};

export enum POINT_TYPES {
    MOST = 'most',
    LEAST = 'least',
};