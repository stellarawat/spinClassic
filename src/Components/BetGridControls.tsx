import {FC, useEffect, useRef, useState} from "react";

interface BetGridControlsProps {
    amount: number;
    isSpinning: boolean;
    isCountingDown: boolean;
}

const BetGridControls:FC<BetGridControlsProps> = ({amount,isSpinning}) => {
    const [selectedColumnKeys, setSelectedColumnKeys] = useState<number[]>([]);
    const [selectedGridKeys, setSelectedGridKeys] = useState<number[]>([]);
    const prevSpinRef = useRef<boolean>(false);

    useEffect(() => {
        // Detect transition from spinning to not spinning
        if (prevSpinRef.current && !isSpinning) {
            setSelectedColumnKeys([]);
            setSelectedGridKeys([]);
            console.log ("Resetting Bet Grid Controls");
        }
        prevSpinRef.current = isSpinning;
    }, [isSpinning]);

    const handleClick = (type: "column" | "grid", index: number) => {
        if (isSpinning) return; // 🚫 prevent selection when spinning


        if (type === "column") {
            const newSelected = selectedColumnKeys.includes(index)
                ? selectedColumnKeys.filter((key) => key !== index)
                : [...selectedColumnKeys, index];
            setSelectedColumnKeys(newSelected);
            console.log("Selected Column Keys:", newSelected);
        } else {
            const newSelected = selectedGridKeys.includes(index)
                ? selectedGridKeys.filter((key) => key !== index)
                : [...selectedGridKeys, index];
            setSelectedGridKeys(newSelected);
            console.log("Selected Grid Keys:", newSelected);
        }
    };
    const columnControls = [
        { number: 1, multiplier: "x1", color: "orange" },
        { number: 2, multiplier: "x2", color: "yellowgreen" },
        { number: 3, multiplier: "x3", color: "peru" },
        { number: 4, multiplier: "x4", color: "blue" },
    ];


    const gridControls = [
        { letter: "P", multiplier: "5x" },
        { letter: "L", multiplier: "5x" },
        { letter: "A", multiplier: "5x" },
        { letter: "Y", multiplier: "5x" },
        { letter: "S", multiplier: "8x" },
        { letter: "P", multiplier: "8x" },
        { letter: "I", multiplier: "8x" },
        { letter: "N", multiplier: "8x" },
        { letter: "G", multiplier: "10x" },
        { letter: "A", multiplier: "10x" },
        { letter: "M", multiplier: "10x" },
        { letter: "E", multiplier: "10x" },
    ];

    return (
        <div className="Spin-classic-controls-container">
            {/* Clickable Column Controls */}

            {/* Render column controls */}
            <div className="Spin-classic-controls">
                {columnControls.map(({ number, multiplier }, index) => (
                    <div
                        key={`col-${index}`}
                        className={`spin-classic-column-${number} ${selectedColumnKeys.includes(index) ? "active" : ""}${isSpinning ? "disabled" : ""}`}
                        onClick={() => handleClick("column", index)}
                        style={{ position: "relative", overflow: "hidden" }}
                    >
                        {number}
                        <span className="spin-classic-column-place">{multiplier}</span>
                        {selectedColumnKeys.includes(index) && (
                            <div className="spin-classic-amount-overlay">{amount}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Render grid controls */}
            <div className="spin-classic-grid-controls">
            {gridControls.map(({ letter, multiplier }, index) => (
                <div
                    key={`grid-${index}`}
                    className={`spin-classic-grid-item ${selectedGridKeys.includes(index) ? "active" : ""}${isSpinning ? "disabled" : ""}`}
                    onClick={() => handleClick("grid", index)}
                >
                    {letter}
                    <span className="spin-classic-grid-place">{multiplier}</span>
                    {selectedGridKeys.includes(index) && (
                        <div className="spin-classic-amount-overlay">{amount}</div>
                    )}
                </div>
            ))}
            </div>
        </div>
    );
};

export default BetGridControls;
