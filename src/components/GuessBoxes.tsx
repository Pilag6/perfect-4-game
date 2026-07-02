import Box from "./Box.tsx";

type TGuessProps = {
    number: string[];
    numToGuess: string[];
    isActive: boolean;
    shouldReveal: boolean;
    isSubmitted: boolean;
    rowIndex: number;
    invalidAttemptKey: number;
};

const GuessBoxes = ({
    number,
    numToGuess,
    isActive,
    shouldReveal,
    isSubmitted,
    rowIndex,
    invalidAttemptKey,
}: TGuessProps) => {
    return (
        <div
            key={invalidAttemptKey}
            className={`flex justify-center gap-2 rounded-2xl border px-2 py-2 transition ${
                isActive
                    ? "border-fourGreen/50 bg-fourGreen/10 shadow-lg shadow-fourGreen/10"
                    : "border-white/5 bg-slate-900/45"
            } ${invalidAttemptKey ? "shake-invalid" : ""}`}
            aria-label={`Guess row ${rowIndex + 1}`}
        >
            {number.map((num, index) => (
                <Box
                    key={`${index}-${isSubmitted ? "submitted" : num}`}
                    num={num}
                    numToGuessSplit={numToGuess[index]}
                    numToGuess={numToGuess}
                    shouldReveal={shouldReveal}
                    isSubmitted={isSubmitted}
                    index={index}
                />
            ))}
        </div>
    );
};

export default GuessBoxes;
