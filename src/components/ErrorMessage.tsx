import React from "react";

interface ErrorMessageProps {
    error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
    <p className="text-red-500 font-bold text-center absolute bottom-3 right-3 bg-fourWhite py-4 px-6">
        {error}
    </p>
);

export default ErrorMessage;
