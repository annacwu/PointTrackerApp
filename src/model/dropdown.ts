export type DropdownOption = {
    label: string;
    value: string;
};

export type SingleDropdownProps = {
    itemName: string;
    data: DropdownOption[];
};

export type MultiDropdownProps = {
    itemName: string;
    data: DropdownOption[];
}; 