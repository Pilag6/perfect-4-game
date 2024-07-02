import "./App.css";
import { useEffect, useRef, useState } from "react";
import { generateRandomNumber } from "./utils/play";
import GuessBoxes from "./components/GuessBoxes";
import SendSVG from "./components/SendSVG";

function App() {
    const randomNumber = generateRandomNumber();
    const [randomNum, setRandomNum] = useState(randomNumber);

    const [number, setNumber] = useState<string | null>(null);
    const [numbers, setNumbers] = useState<string[]>(Array(6).fill("")); // Pre-render 8 guess slots
    const [guessesLeft, setGuessesLeft] = useState(6);
    const [correct, setCorrect] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        refInput.current?.focus();
    }, []);

    const tryAgainHandler = () => {
        setRandomNum(generateRandomNumber());
        setNumber(null);
        setNumbers(Array(6).fill(""));
        setGuessesLeft(6);
        setCorrect(false);
        setError(null);
    };

    const handleGuess = () => {
        if (correct || guessesLeft <= 0) {
            return; // Prevent further guesses if the game is over
        }

        if (!number || number.length !== 4) {
            setError("Please enter a 4-digit number.");
            setNumber(""); // Clear input
            clearErrorAfterDelay(); // Clear error after delay
            return; // Ensure number has 4 digits before proceeding
        }

        if (hasRepeatedDigits(number)) {
            setError("You must type 4 different numbers. Try again.");
            setNumber(""); // Clear input
            clearErrorAfterDelay(); // Clear error after delay
            return; // Ensure number does not have repeated digits
        }

        const newNumbers = [...numbers];
        newNumbers[6 - guessesLeft] = number; // Update the current guess slot

        setGuessesLeft((prevGuessesLeft) => prevGuessesLeft - 1);
        setNumbers(newNumbers);
        setNumber("");
        setError(null);

        if (randomNum.toString() === number) {
            setCorrect(true);
        }
        refInput.current?.focus();
    };

    const clearErrorAfterDelay = () => {
        setTimeout(() => {
            setError(null);
        }, 3000);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleGuess();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 4) {
            setNumber(value);
        }
    };

    const hasRepeatedDigits = (num: string) => {
        const digits = num.split("");
        return new Set(digits).size !== digits.length;
    };

    console.log(randomNum);

    return (
        <div className=" bg-fourBlue flex justify-center min-h-screen">
            <div className="flex flex-col gap-4 py-10 w-[420px] border outline outline-fourWhite -outline-offset-8">
                <h1 className="text-2xl font-bold text-center uppercase text-fourWhite">
                    Perfect Four <br /> <span className="text-fourGreen text-lg">By Pila</span>
                </h1>

                <div className="flex px-[86px]">
                    <input
                        className="no-arrows h-14 w-full text-center outline-none bg-fourWhite text-fourBlue font-semibold"
                        type="number"
                        placeholder="Type here..."
                        value={number || ""}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        ref={refInput}
                        maxLength={4}
                        disabled={correct || guessesLeft <= 0} // Disable input if game over
                    />
                    <button
                        className="px-4 w-16 bg-fourGreen text-fourWhite font-semibold"
                        onClick={handleGuess}
                        disabled={correct || guessesLeft <= 0} // Disable button if game over
                    >
                        <SendSVG />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    {numbers.map((num, index) => (
                        <GuessBoxes
                            key={index}
                            number={num.padEnd(4, " ").split("")}
                            numToGuess={randomNum.toString().split("")}
                        />
                    ))}
                </div>

                {correct && (
                    <div className="text-center text-fourWhite">
                        <p>YOU WIN!</p>
                        <button
                            onClick={tryAgainHandler}
                            className="py-2 px-8 bg-fourGreen text-fourWhite font-semibold mt-4"
                        >
                            Try Again
                        </button>
                    </div>
                )}
                {guessesLeft === 0 && !correct && (
                    <div className="text-center text-fourWhite">
                        <p>YOU LOSE!</p>
                        <button
                            onClick={tryAgainHandler}
                            className="py-2 px-8 bg-fourGreen text-fourWhite font-semibold mt-4"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            {error && (
                <p className="text-red-500 font-bold text-center absolute bottom-3 right-3 bg-fourWhite py-4 px-6">
                    {error}
                </p>
            )}
        </div>
    );
}

export default App;
