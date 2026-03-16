/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

interface UseErrorHandlerProps {
  error: any;
  refetch: () => void;
}

interface UseErrorHandlerReturn {
  hasError: boolean;
  errorMessage: string;
  retry: () => void;
  clearError: () => void;
}

export const useErrorHandler = ({
  error,
  refetch,
}: UseErrorHandlerProps): UseErrorHandlerReturn => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error) {
      setHasError(true);
      const message =
        error?.data?.message ||
        error?.message ||
        error?.error ||
        "An error occurred while loading data. Please try again.";
      setErrorMessage(message);
    } else {
      setHasError(false);
      setErrorMessage("");
    }
  }, [error]);

  const retry = () => {
    setHasError(false);
    setErrorMessage("");
    refetch();
  };

  const clearError = () => {
    setHasError(false);
    setErrorMessage("");
  };

  return {
    hasError,
    errorMessage,
    retry,
    clearError,
  };
};
