import { useState } from "react";

const BetHistory = () => {
    const [historyLevel, setHistoryLevel] = useState<number>(5);

    return (
        <>
            <div className="spin-classic-history-dropdown-container">
                <div className="spin-classic-history-select-name">History table</div>
                {/* Change div to select */}
                <select
                    id="history-select"
                    className="spin-classic-history-select"
                    value={historyLevel}
                    onChange={(e) => setHistoryLevel(Number(e.target.value))}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="spin-classic-history-dropdown">
                <table className="spin-classic-history-table">
                    <thead>
                    <tr>
                        <th>Bet Amount</th>
                        <th>Multiplier</th>
                        <th>Outcome</th>
                    </tr>
                    </thead>
                    <tbody className="spin-classic-history-tbody">
                    {/*    <tr key={index}>*/}
                    {/*        <td>{bet.betAmount}</td>*/}
                    {/*        <td>{bet.multiplier}x</td>*/}
                    {/*        <td className={bet.outcome === "Win" ? "win" : "loss"}>*/}
                    {/*            {bet.outcome}*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BetHistory;
