import Box from "./Box.tsx";

type TGuessProps = {
    number: string[];
    numToGuess: string[];
};

const GuessBoxes = ({ number, numToGuess }: TGuessProps) => {
    return (
        <div className="flex justify-center gap-2">
            {number.map((num, index) => (
                <Box
                    key={index}
                    num={num}
                    numToGuessSplit={numToGuess[index]}
                    numToGuess={numToGuess}
                />
            ))}
        </div>
    );
};

export default GuessBoxes;
