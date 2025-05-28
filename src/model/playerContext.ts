import { DropdownOption } from "./dropdown";
import { Player } from "./player";

export type PlayerContextType = {
  allPlayers: Player[];
  refreshPlayers: () => void;
  selectedPlayers: Player[];
  setSelectedPlayers: (players: Player[]) => void;
  playerOptions: DropdownOption[];
};
