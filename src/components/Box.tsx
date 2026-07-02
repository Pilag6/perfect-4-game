type TBoxProps = {
    num: string;
    numToGuessSplit: string;
    numToGuess: string[];
    shouldReveal: boolean;
    isSubmitted: boolean;
    index: number;
};

const Box = ({
    num,
    numToGuessSplit,
    numToGuess,
    shouldReveal,
    isSubmitted,
    index,
}: TBoxProps) => {
    const stateClass = !isSubmitted
        ? "empty"
        : num === numToGuessSplit
        ? "correct"
        : numToGuess.includes(num)
        ? "misplaced"
        : "wrong";

    return (
        <div
            className={`${stateClass} tile ${shouldReveal ? "tile-reveal" : ""} ${
                !isSubmitted && num.trim() ? "typed-digit" : ""
            }`}
            style={{ animationDelay: shouldReveal ? `${index * 120}ms` : undefined }}
            aria-label={isSubmitted ? `${num}, ${stateClass}` : "Empty digit"}
        >
            {num}
        </div>
    );
};

export default Box;
