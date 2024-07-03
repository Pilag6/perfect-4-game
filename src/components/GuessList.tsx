import React from "react";
import GuessBoxes from "./GuessBoxes";

interface GuessListProps {
    numbers: string[];
    randomNum: number;
}

const GuessList: React.FC<GuessListProps> = ({ numbers, randomNum }) => (
    <div className="flex flex-col gap-2">
        {numbers.map((num, index) => (
            <GuessBoxes
                key={index}
                number={num.padEnd(4, " ").split("")}
                numToGuess={randomNum.toString().split("")}
            />
        ))}
    </div>
);

export default GuessList;
