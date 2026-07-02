import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateRandomNumber } from "./utils/play";
import Header from "./components/Header";
import GuessList from "./components/GuessList";
import GameStatus from "./components/GameStatus";
import ErrorMessage from "./components/ErrorMessage";
import InstructionsModal from "./components/InstructionsModal";

const App: React.FC = () => {
    const [randomNum, setRandomNum] = useState<number>(generateRandomNumber());
    const [number, setNumber] = useState<string | null>(null);
    const [numbers, setNumbers] = useState<string[]>(Array(5).fill(""));
    const [guessesLeft, setGuessesLeft] = useState<number>(5);
    const [correct, setCorrect] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [confettiActive, setConfettiActive] = useState<boolean>(false);
    const [lastSubmittedRow, setLastSubmittedRow] = useState<number | null>(null);
    const [invalidAttemptKey, setInvalidAttemptKey] = useState<number>(0);
    const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

    const refInput = useRef<HTMLInputElement>(null);

    const focusInput = useCallback(() => {
        refInput.current?.focus();
    }, []);

    const focusInputAfterRender = useCallback(() => {
        setTimeout(focusInput, 0);
    }, [focusInput]);

    useEffect(() => {
        focusInputAfterRender();
    }, [focusInputAfterRender]);

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
        setConfettiActive(false);
        setLastSubmittedRow(null);
        setInvalidAttemptKey(0);
        focusInputAfterRender();
    };

    const isGameOver = correct || guessesLeft <= 0;

    const handleGuess = () => {
        if (correct || guessesLeft <= 0) return;

        if (!number || number.length !== 4) {
            setError("Enter exactly 4 unique digits to submit a code.");
            setInvalidAttemptKey((prev) => prev + 1);
            resetNumber();
            return;
        }

        if (hasRepeatedDigits(number)) {
            setError("Each digit must be different. Try a cleaner code.");
            setInvalidAttemptKey((prev) => prev + 1);
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

    const appendDigits = (digits: string) => {
        if (isGameOver || !digits) return;
        setNumber((prev) => `${prev || ""}${digits}`.slice(0, 4));
        setError(null);
    };

    const deleteLastDigit = () => {
        if (isGameOver) return;
        setNumber((prev) => (prev || "").slice(0, -1));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleGuess();
            return;
        }

        if (e.key === "Backspace") {
            e.preventDefault();
            deleteLastDigit();
            return;
        }

        if (/^[0-9]$/.test(e.key)) {
            e.preventDefault();
            appendDigits(e.key);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        appendDigits(e.target.value.replace(/\D/g, ""));
    };

    const hasRepeatedDigits = (num: string) => {
        const digits = num.split("");
        return new Set(digits).size !== digits.length;
    };

    const updateNumbers = (number: string) => {
        const newNumbers = [...numbers];
        const submittedRow = 5 - guessesLeft;
        newNumbers[submittedRow] = number;
        setNumbers(newNumbers);
        setLastSubmittedRow(submittedRow);
        setNumber("");
        setError(null);
        setGuessesLeft((prev) => prev - 1);
    };

    return (
        <main className="relative h-dvh min-h-dvh overflow-hidden bg-[#050812] px-3 py-3 text-fourWhite sm:px-5 sm:py-5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.14),transparent_32%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fourGreen/70 to-transparent" />
            <section className="relative mx-auto flex h-full w-full max-w-[500px] items-center justify-center">
                <div className="w-full rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-2.5 shadow-2xl shadow-black/50 backdrop-blur sm:p-5">
                    <div
                        className="relative flex flex-col items-center gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-2.5 py-4 sm:gap-4 sm:px-5 sm:py-5"
                        onPointerDown={focusInput}
                    >
                        <Header onHelpClick={() => setIsInstructionsOpen(true)} />
                        <label htmlFor="board-code-input" className="sr-only">
                            Type a four digit code guess
                        </label>
                        <input
                            id="board-code-input"
                            ref={refInput}
                            className="board-input-capture"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="off"
                            aria-label="Type a four digit code guess"
                            value=""
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            disabled={isGameOver}
                        />
                        {error && <ErrorMessage error={error} />}
                        <GuessList
                            numbers={numbers}
                            randomNum={randomNum}
                            activeRow={5 - guessesLeft}
                            currentGuess={number || ""}
                            lastSubmittedRow={lastSubmittedRow}
                            invalidAttemptKey={invalidAttemptKey}
                        />
                        <GameStatus
                            correct={correct}
                            guessesLeft={guessesLeft}
                            tryAgainHandler={tryAgainHandler}
                            confettiActive={confettiActive}
                            randomNum={randomNum}
                        />
                    </div>
                </div>
            </section>
            {isInstructionsOpen && <InstructionsModal onClose={() => setIsInstructionsOpen(false)} />}
        </main>
    );
};

export default App;
