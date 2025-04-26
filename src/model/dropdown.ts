export type DropdownOption = {
    label: string;
    value: string;
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