type TBoxProps = {
    num: string;
    numToGuessSplit: string;
    numToGuess: string[];
};

const Box = ({ num, numToGuessSplit, numToGuess }: TBoxProps) => {
    console.log({ num, numToGuessSplit, numToGuess });
    
    const addClass =
        num === numToGuessSplit
            ? "correct"
            : numToGuess.includes(num)
            ? "misplaced"
            : "";
    return (
        <div
            className={`${addClass} text-3xl text-fourWhite w-14 h-14 flex items-center justify-center border`}
        >
            {num}
        </div>
    );
};

export default Box;
