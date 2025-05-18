import { Folder } from "./folder";
import { Player } from "./player";
import { Tag } from "./tag";

export type DropdownOption = {
  label: string;
  value: Player | Folder | Tag;
};

export type SingleDropdownProps = {
  itemName: string;
  data: DropdownOption[];
  selected: any;
  setSelected: (selection: any) => void;
};

// FIXME: come back to this any situation
export type MultiDropdownProps = {
  itemName: string;
  data: DropdownOption[];
  selected: any[];
  setSelected: (selection: any[]) => void;
};
