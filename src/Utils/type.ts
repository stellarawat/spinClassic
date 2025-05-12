// Type for each color occurrence
export type placeOccurrences = {
    id: number;
    color: string;
    positions: number[];
};

// The settings type with a flexible structure
export type Settings = {
    showDropdown: boolean;
    showHelpOverlay: boolean;
    betAmount: number;
    [key: string]: boolean | number;
};

export const SPIN_STARTING = 1 //countdown;
export const SPIN_SPINNING = 2; // spinning
export const SPIN_ENDING = 3; // end

export const SPIN_DURATIONS: Record<number, number> = {
    [SPIN_STARTING]: 6000,
    [SPIN_SPINNING]: 4500,
    [SPIN_ENDING]: 4000,
};

export type SpinState =
    | typeof SPIN_STARTING
    | typeof SPIN_SPINNING
    | typeof SPIN_ENDING;

export type WheelData = {
    position: number;
    color: string;
    label: string
}

export const placeOccurrences = [
    {id: 1, color: "orange", positions: [1, 3, 5, 12, 15, 17, 18, 24, 26, 27, 28, 35], label: "1"},
    {id: 2, color: "yellowgreen", positions: [13, 16, 25, 29], label: "2"},
    {id: 3, color: "peru", positions: [4, 11, 14, 30], label: "3"},
    {id: 4, color: "blue", positions: [2, 10, 23], label: "4"},

    {id: 3, color: "DarkMagenta", positions: [6], label: "P"},
    {id: 4, color: "DarkMagenta", positions: [7], label: "L"},
    {id: 5, color: "DarkMagenta", positions: [8], label: "A"},
    {id: 6, color: "DarkMagenta", positions: [9], label: "Y"},

    {id: 7, color: "crimson", positions: [19], label: "S"},
    {id: 8, color: "crimson", positions: [20], label: "P"},
    {id: 9, color: "crimson", positions: [21], label: "I"},
    {id: 10, color: "crimson", positions: [22], label: "N"},

    {id: 11, color: "cornflowerblue", positions: [31], label: "G"},
    {id: 12, color: "cornflowerblue", positions: [32], label: "A"},
    {id: 13, color: "cornflowerblue", positions: [33], label: "M"},
    {id: 14, color: "cornflowerblue", positions: [34], label: "E"},
];
