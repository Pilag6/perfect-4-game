import React, { ChangeEvent, KeyboardEvent, RefObject } from "react";
import SendSVG from "./SendSVG";

interface InputSectionProps {
    number: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleGuess: () => void;
    refInput: RefObject<HTMLInputElement>;
    correct: boolean;
    guessesLeft: number;
}

const InputSection: React.FC<InputSectionProps> = ({
    number,
    handleChange,
    handleKeyPress,
    handleGuess,
    refInput,
    correct,
    guessesLeft,
}) => (
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
            disabled={correct || guessesLeft <= 0}
        />
        <button
            className="px-4 w-16 bg-fourGreen text-fourWhite font-semibold"
            onClick={handleGuess}
            disabled={correct || guessesLeft <= 0}
        >
            <SendSVG />
        </button>
    </div>
);

export default InputSection;
