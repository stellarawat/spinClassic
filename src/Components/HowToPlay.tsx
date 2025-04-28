import { FC } from "react";
import CloseImage from "../assets/images/close (1).png"

interface HowToPlayProp {
    onClose: () => void;
}

export const HowToPlay: FC<HowToPlayProp> = ({ onClose}) => {

    return (
        <div className="how-to-play">
            <img
                style={{width: "26px", cursor: "pointer"}}
                src={CloseImage}
                onClick={onClose}
                alt="Close"
            />
            <div className="how-to-play-content">
                <h1>How to Play Spin to Win Classic</h1>
                <ol>
                    <li>
                        <strong>Check Your Balance:</strong> Ensure you have enough funds in your account before
                        spinning. Spins start from just 1 Ksh.
                    </li>
                    <li>
                        <strong>Place Your Bet:</strong> The spin cost will be deducted from your balance when you
                        initiate a spin.
                    </li>
                    <li>
                        <strong>Spin the Wheel:</strong> Tap the <em>"BET"</em> button to start the game. The wheel will
                        spin and land on a random segment.
                    </li>
                    <li>
                        <strong>Win Multipliers:</strong> Each segment has a multiplier (e.g., x0.5, x1.00, x2.00). Your
                        winnings depend on where the wheel stops.
                    </li>
                    <li>
                        <strong>Receive Your Payout:</strong> Your winnings (or losses) are instantly reflected in your
                        balance based on the multiplier.
                    </li>
                    <li>
                        <strong>Keep Playing:</strong> Spin again as long as you have enough funds. Play smart and aim
                        for big wins!
                    </li>
                </ol>
                <p>
                    Need help? Check out the support section or contact us for assistance.
                </p>
            </div>
        </div>
    );
};