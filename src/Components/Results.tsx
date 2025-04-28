import {FC} from "react";
import {WheelData} from "../Utils/type.ts";

interface ResultsProps {
    winningSegment: WheelData;
}

export const Results: FC<ResultsProps> = ({winningSegment}) => {
    return (
        <div className="overlay-classic">
            <div className="overlay-content-classic">
                <div className="results-text-classic">
                    <div>
                        {/*Position: {winningSegment.position}, Label: */}

                        {winningSegment.label}
                    </div>
                </div>
            </div>
        </div>
    );
};
