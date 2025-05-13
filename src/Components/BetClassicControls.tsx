import {FC} from "react";

interface SpinBetProps {
    spinBetAmount: number;
    onChangeSpinBetAmount: (amount: number) => void;
    isSpinning: boolean;
}

const BetClassicControls: FC<SpinBetProps> = ({spinBetAmount, onChangeSpinBetAmount, isSpinning}) => {

    return (
        <div>
            <div className="spin-classic-bet-amount-title">Bet Amount</div>
            <div className="spin-classic-bet-amount-area">
                <div className={`spin-classic-bet-controls ${
                    isSpinning ? "disabled-bet" : ""
                }`}
                >
                    {[5, 10, 50, 100].map((amount) => (
                        <div
                            className={`spin-classic-bet-controls-buttons ${spinBetAmount === amount ? "spin-active-bet" : ""}`}
                            key={amount}
                            onClick={() => onChangeSpinBetAmount(amount)}
                        >
                            {amount}
                        </div>
                    ))}
                </div>
                <div className={`spin-classic-plus-minus-input-container ${
                    isSpinning ? "disabled-bet" : ""
                }`}
                >
                    <div className="spin-classic-plus-minus"
                         onClick={() => onChangeSpinBetAmount(Math.max(spinBetAmount - 1, 0))}
                    >
                        -
                    </div>

                    <input
                        className="spin-classic-bet-Amount"
                        disabled={isSpinning}
                        value={spinBetAmount}
                        onChange={(e) => onChangeSpinBetAmount(parseInt(e.target.value, 10) || 0)}
                    />

                    <div className="spin-classic-plus-minus"
                         onClick={() => onChangeSpinBetAmount(spinBetAmount + 1)}>
                        +
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BetClassicControls;