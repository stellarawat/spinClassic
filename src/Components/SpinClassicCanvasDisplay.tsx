import {FC, useEffect, useRef, useState} from "react";
import {WheelData} from "../Utils/type.ts";

interface spinClassicProps{
    winningSegment:WheelData |null;
    isSpinning:boolean;
}

const SpinClassicCanvasDisplay:FC <spinClassicProps>= ({winningSegment,isSpinning}) => {

    const [history, setHistory] = useState<WheelData[]>([]);
    const prevSegmentRef = useRef<WheelData | null>(null);

    useEffect(() => {
        if (winningSegment && !isSpinning && winningSegment !== prevSegmentRef.current) {
            setHistory((prev) => {
                const updated = [...prev, winningSegment];
                if (updated.length > 8) updated.shift();
                return updated;
            });
            prevSegmentRef.current = winningSegment;
        }
    }, [winningSegment, isSpinning]);

    return (

        <div className="Spin-classic-multipliers-display">
            {history.map((segment, index) => (

                <div
                    key={index}
                    className="spin-classic-outcome-display"
                    style={{
                        backgroundColor: segment.color,
                    }}
                >
                    {segment.label}
                </div>
            ))}

        </div>
    );
};

export default SpinClassicCanvasDisplay;
