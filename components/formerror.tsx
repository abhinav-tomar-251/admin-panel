import { FaExclamationCircle } from "react-icons/fa";

interface FormErrorProps {
    message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className="flex items-center gap-x-2 text-sm text-destructive bg-destructive/15 p-3 rounded-md">
            <FaExclamationCircle className="h-5 w-5"/>
            <p>{message}</p>
        </div>
    );
};