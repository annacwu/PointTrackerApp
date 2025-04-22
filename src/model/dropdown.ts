export type DropdownOption = {
    label: string;
    value: string;
};

export type MultiDropdownProps = {
    itemName: string;
    data: DropdownOption[];
}; 