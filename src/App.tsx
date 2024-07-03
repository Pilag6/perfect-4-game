import "./App.css";
import { useEffect, useRef, useState } from "react";
import { generateRandomNumber } from "./utils/play";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import GuessList from "./components/GuessList";
import GameStatus from "./components/GameStatus";
import ErrorMessage from "./components/ErrorMessage";

const App: React.FC = () => {
    const [randomNum, setRandomNum] = useState<number>(generateRandomNumber());
    const [number, setNumber] = useState<string | null>(null);
    const [numbers, setNumbers] = useState<string[]>(Array(5).fill(""));
    const [guessesLeft, setGuessesLeft] = useState<number>(5);
    const [correct, setCorrect] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [confettiActive, setConfettiActive] = useState<boolean>(false);

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
        setNumbers(Array(5).fill(""));
        setGuessesLeft(5);
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
        newNumbers[5 - guessesLeft] = number;
        setNumbers(newNumbers);
        setNumber("");
        setError(null);
        setGuessesLeft((prev) => prev - 1);
    };

    return (
        <div className="bg-fourBlue flex justify-center items-center min-h-screen relative overflow-hidden ">
            <div className="h-fit flex flex-col items-center justify-center gap-4 py-10 w-[420px] border outline outline-fourWhite -outline-offset-8">
                <Header />
                <InputSection
                    number={number}
                    handleChange={handleChange}
                    handleKeyPress={handleKeyPress}
                    handleGuess={handleGuess}
                    refInput={refInput}
                    correct={correct}
                    guessesLeft={guessesLeft}
                />
                <GuessList numbers={numbers} randomNum={randomNum} />
                <GameStatus
                    correct={correct}
                    guessesLeft={guessesLeft}
                    tryAgainHandler={tryAgainHandler}
                    confettiActive={confettiActive}
                    randomNum={randomNum}
                />
            </div>
            {error && <ErrorMessage error={error} />}
        </div>
    );
};

export default App;
