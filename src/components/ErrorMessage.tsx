import React from "react";

interface ErrorMessageProps {
    error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
    <p className="toast-message" role="alert" aria-live="polite">
        {error}
    </p>
);

export default ErrorMessage;
