import React from "react";
import Confetti from "react-confetti";

interface GameStatusProps {
    correct: boolean;
    guessesLeft: number;
    tryAgainHandler: () => void;
    confettiActive: boolean;
    randomNum: number;
}

const GameStatus: React.FC<GameStatusProps> = ({ correct, guessesLeft, tryAgainHandler, confettiActive, randomNum }) => (
    <>
        {correct && (
            <div className="text-center text-fourWhite mt-4">
                <p className="text-2xl font-bold">🎉 YOU WIN! 🎉</p>
                <button
                    onClick={tryAgainHandler}
                    className="py-2 px-8 bg-fourGreen text-fourWhite font-semibold mt-4"
                >
                    Try Again
                </button>
                {confettiActive && (
                    <div className="absolute top-0 left-0">
                        <Confetti />
                    </div>
                )}
            </div>
        )}
        {guessesLeft === 0 && !correct && (
            <div className="text-center text-fourWhite mt-4">
                <p className="text-2xl font-bold">YOU LOSE!</p>
                <p className=" my-4">The correct number was <span className="bg-fourYellow text-fourBlue py-1 px-2 font-bold">{randomNum}</span></p>
                <button
                    onClick={tryAgainHandler}
                    className="py-2 px-8 bg-fourGreen text-fourWhite font-semibold mt-4"
                >
                    Try Again
                </button>
            </div>
        )}
    </>
);

export default GameStatus;
