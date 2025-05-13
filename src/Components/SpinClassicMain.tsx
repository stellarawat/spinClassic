import {FC, useEffect, useState} from "react";
import '../Style.css';
import SpinClassicCanvasDisplay from "./SpinClassicCanvasDisplay.tsx";
import SpinClassicCanvas from "./SpinClassicCanvas.tsx";
import BetGridControls from "./BetGridControls.tsx";
import BetClassicControls from "./BetClassicControls.tsx";
import BetHistory from "./BetHistory.tsx";
// import {useSpinSound} from "../Hooks/SpinUseSound.ts";
import {HowToPlay} from "./HowToPlay.tsx";
import {
    Settings,
    SPIN_SPINNING,
    SPIN_STARTING,
    SPIN_ENDING,
    SpinState,
    SPIN_DURATIONS,
    WheelData
} from "../Utils/type.ts";
import {CountDown} from "./CountDown.tsx";
import {Results} from "./Results.tsx";

export const SpinClassicMain: FC = () => {
    // const {playSound} = useSpinSound(false, true);
    const [spinState, setSpinState] = useState<SpinState>(SPIN_STARTING);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [wheelData, setWheelData] = useState<WheelData[]>([]);
    const [winningSegment, setWinningSegment] = useState<WheelData | null>(null);
    const [settings, setSettings] = useState<Settings>({
        showDropdown: false,
        showHelpOverlay: false,
        betAmount: 1
    });

    useEffect(() => {
        // console.log("winning segment",winningSegment)

        const timeout = SPIN_DURATIONS[spinState];
        if (timeout) {
            const timer = setTimeout(() => {
                if (spinState === SPIN_STARTING) {
                    setSpinState(SPIN_SPINNING);
                    setIsSpinning(true);
                    // playSound("spinning");
                } else if (spinState === SPIN_SPINNING) {
                    setSpinState(SPIN_ENDING);
                } else if (spinState === SPIN_ENDING) {
                    setIsSpinning(false);
                    setSpinState(SPIN_STARTING);

                    // if (wheelData.length > 0) {
                    //     const winningIndex = Math.floor(Math.random() * wheelData.length); // Simulate winning logic
                    // }
                }
            }, timeout);

            return () => clearTimeout(timer);
        }
    }, [spinState]);

    const toggleSetting = (key: keyof Settings) => {
        setSettings(prev => ({...prev, [key]: !prev[key]}));
    };

    return (
        <div className="Spin-classic-main-component">
            <div className="main-classic-spin-container">
                <div className="Spin-classic-container">
                    <div className="spin-classic-canvas">
                        <SpinClassicCanvas
                            spinState={spinState}
                            wheelData={wheelData}
                            onsetWheelData={(newData) => setWheelData(newData)}
                            setWinningSegment={setWinningSegment}
                        />
                    </div>
                    <div className="Spin-classic-multipliers-display">
                        <SpinClassicCanvasDisplay
                            isSpinning={isSpinning}
                            winningSegment={winningSegment}
                        />
                    </div>
                </div>

                {spinState === SPIN_STARTING && (
                    <CountDown/>
                )}

                {spinState === SPIN_ENDING &&  winningSegment && (
                    <Results
                        winningSegment={winningSegment}
                    />
                )}

                <div className="spin-classic-controls-container">
                    <BetGridControls
                        amount={settings.betAmount}
                        isSpinning={isSpinning}
                        isCountingDown={false}
                    />

                    <BetClassicControls
                        spinBetAmount={settings.betAmount}
                        isSpinning={isSpinning}
                        onChangeSpinBetAmount={(amount) => setSettings((prev) => ({...prev, betAmount: amount}))}
                    />

                    <div className="spin-classic-bet-history">
                        <BetHistory/>
                    </div>
                </div>

                {settings.showHelpOverlay && (
                    <HowToPlay onClose={() => toggleSetting('showHelpOverlay')}/>
                )}
            </div>
        </div>
    );
};
