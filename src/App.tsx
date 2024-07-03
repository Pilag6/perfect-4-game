import "./App.css";
import { useEffect, useRef, useState } from "react";
import { generateRandomNumber } from "./utils/play";
import Confetti from "react-confetti";
import GuessBoxes from "./components/GuessBoxes";
import SendSVG from "./components/SendSVG";

function App() {
    const [randomNum, setRandomNum] = useState(generateRandomNumber());
    const [number, setNumber] = useState<string | null>(null);
    const [numbers, setNumbers] = useState<string[]>(Array(6).fill(""));
    const [guessesLeft, setGuessesLeft] = useState(6);
    const [correct, setCorrect] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [confettiActive, setConfettiActive] = useState(false);

    const refInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        refInput.current?.focus();
    }, []);

    useEffect(() => {
        if (correct) {
            setConfettiActive(true);
            const timer = setTimeout(() => setConfettiActive(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [correct]);

    const tryAgainHandler = () => {
        setRandomNum(generateRandomNumber());
        setNumber(null);
        setNumbers(Array(6).fill(""));
        setGuessesLeft(6);
        setCorrect(false);
        setError(null);
    };

    const handleGuess = () => {
        if (correct || guessesLeft <= 0) return;

        if (!number || number.length !== 4) {
            setError("Please enter a 4-digit number.");
            resetNumber();
            return;
        }

        if (hasRepeatedDigits(number)) {
            setError("You must type 4 different numbers. Try again.");
            resetNumber();
            return;
        }

        updateNumbers(number);
        if (randomNum.toString() === number) setCorrect(true);

        refInput.current?.focus();
    };

    const resetNumber = () => {
        setNumber("");
        clearErrorAfterDelay();
    };

    const clearErrorAfterDelay = () => {
        setTimeout(() => setError(null), 5000);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleGuess();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 4 && /^[0-9]*$/.test(value)) setNumber(value);
    };

    const hasRepeatedDigits = (num: string) => {
        const digits = num.split("");
        return new Set(digits).size !== digits.length;
    };

    const updateNumbers = (number: string) => {
        const newNumbers = [...numbers];
        newNumbers[6 - guessesLeft] = number;
        setNumbers(newNumbers);
        setNumber("");
        setError(null);
        setGuessesLeft((prev) => prev - 1);
    };

    return (
        <div className=" bg-fourBlue flex justify-center min-h-screen">
            <div className="flex flex-col gap-4 py-10 w-[420px] border outline outline-fourWhite -outline-offset-8">
                <div className="text-center font-bold w-full py-4">
                    <h1 className="text-2xl uppercase text-fourWhite">
                        Perfect Four
                    </h1>
                    <p className="text-fourGreen text-lg leading-3  text-right pr-32">
                        By Pila
                    </p>
                </div>

                <div className="flex px-[86px] my-4">
                    <input
                        className="no-arrows h-14 w-full text-center outline-none bg-fourWhite text-fourBlue font-semibold"
                        type="text"
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
                    <div className="text-center text-fourWhite mt-4">
                        <p className="text-2xl font-bold">🎉 YOU WIN! 🎉</p>
                        <button
                            onClick={tryAgainHandler}
                            className="py-2 px-8 bg-fourGreen text-fourWhite font-semibold mt-4"
                        >
                            Try Again
                        </button>
                        {confettiActive && <Confetti />}
                    </div>
                )}
                {guessesLeft === 0 && !correct && (
                    <div className="text-center text-fourWhite mt-4">
                        <p className="text-2xl font-bold">YOU LOSE!</p>
                        <button
                            onClick={tryAgainHandler}
                            className="py-2 px-8 bg-fourYellow text-fourWhite font-semibold mt-4"
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
