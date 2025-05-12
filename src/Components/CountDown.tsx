import {useEffect, useState} from "react";

export const CountDown = () => {
    const [count, setCount] = useState(5);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [count]);

    return (
        <>
            {count > 0 && (
                <div className="countdown-container-classic">
                    <div className="countdown-ring-classic"></div>
                    <span className="count-down-text-classic">{count}</span>
                </div>
            )}
        </>
    );
};