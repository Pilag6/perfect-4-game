import React from "react";
import GuessBoxes from "./GuessBoxes";

interface GuessListProps {
    numbers: string[];
    randomNum: number;
    activeRow: number;
    currentGuess: string;
    lastSubmittedRow: number | null;
    invalidAttemptKey: number;
}

const GuessList: React.FC<GuessListProps> = ({
    numbers,
    randomNum,
    activeRow,
    currentGuess,
    lastSubmittedRow,
    invalidAttemptKey,
}) => (
    <div className="flex w-full flex-col gap-2.5" aria-label="Guess history">
        {numbers.map((num, index) => {
            const isActive = index === activeRow && num === "";
            const displayNumber = isActive ? currentGuess : num;

            return (
                <GuessBoxes
                    key={index}
                    number={displayNumber.padEnd(4, " ").split("")}
                    numToGuess={randomNum.toString().split("")}
                    isActive={isActive}
                    shouldReveal={index === lastSubmittedRow}
                    isSubmitted={num !== ""}
                    rowIndex={index}
                    invalidAttemptKey={isActive ? invalidAttemptKey : 0}
                />
            );
        })}
    </div>
);

export default GuessList;
