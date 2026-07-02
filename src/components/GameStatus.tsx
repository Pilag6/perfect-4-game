import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface GameStatusProps {
    correct: boolean;
    guessesLeft: number;
    tryAgainHandler: () => void;
    confettiActive: boolean;
    randomNum: number;
}

const GameStatus: React.FC<GameStatusProps> = ({
    correct,
    guessesLeft,
    tryAgainHandler,
    confettiActive,
    randomNum,
}) => {
    const [viewport, setViewport] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateViewport = () => {
            setViewport({ width: window.innerWidth, height: window.innerHeight });
        };

        updateViewport();
        window.addEventListener("resize", updateViewport);

        return () => window.removeEventListener("resize", updateViewport);
    }, []);

    return (
        <>
        {correct && (
            <div className="status-panel border-fourGreen/40 bg-fourGreen/10">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-fourGreen">Access granted</p>
                <p className="mt-2 text-2xl font-black text-fourWhite">Code cracked.</p>
                <p className="mt-1 text-sm text-slate-300">You found the perfect four-digit sequence.</p>
                <button onClick={tryAgainHandler} className="replay-button">
                    Play again
                </button>
                {confettiActive && (
                    <div className="pointer-events-none fixed inset-0 z-20">
                        <Confetti width={viewport.width} height={viewport.height} recycle={false} />
                    </div>
                )}
            </div>
        )}
        {guessesLeft === 0 && !correct && (
            <div className="status-panel border-fourYellow/40 bg-fourYellow/10">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-fourYellow">Access denied</p>
                <p className="mt-2 text-2xl font-black text-fourWhite">Code expired.</p>
                <p className="mt-1 text-sm text-slate-300">
                    The correct number was{" "}
                    <span className="rounded-md bg-fourYellow px-2 py-1 font-mono font-black text-slate-950">
                        {randomNum}
                    </span>
                </p>
                <button onClick={tryAgainHandler} className="replay-button">
                    Try a new code
                </button>
            </div>
        )}
        </>
    );
};

export default GameStatus;
