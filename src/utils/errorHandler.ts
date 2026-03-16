import { $message } from "./message-service";

export interface ApiError {
  success: boolean;
  message: string;
  statusCode: number;
  error: {
    code: number;
    message: string;
    path: string;
    timestamp: string;
  };
}

export const handleApiError = (error: unknown): string => {
  // Handle network errors
  if (error && typeof error === "object" && "message" in error) {
    if (
      (error as any).message === "Failed to fetch" ||
      (error as any).message === "Network Error"
    ) {
      return "Network error. Please check your connection and try again.";
    }
  }

  // Handle API errors with the structure you provided
  if (error && typeof error === "object" && "data" in error) {
    const errorData = (error as any).data as ApiError;

    // Check if it's the specific error structure you mentioned
    if (errorData?.error?.message) {
      const errorMessage = errorData.error.message;

      // Handle common error messages
      switch (errorMessage) {
        case "errors.internal_server_error":
          return "Server error. Please try again later.";
        case "errors.invalid_credentials":
          return "Invalid credentials. Please check your email and password.";
        case "errors.user_not_found":
          return "User not found. Please check your email address.";
        default:
          return (
            errorData.error.message || "An error occurred. Please try again."
          );
      }
    }

    // Handle other error data structures
    if (errorData?.message) {
      return errorData.message;
    }
  }

  // Handle Redux Toolkit Query errors
  if (error && typeof error === "object" && "error" in error) {
    if (typeof (error as any).error === "string") {
      return (error as any).error;
    }

    if (
      (error as any).error &&
      typeof (error as any).error === "object" &&
      "data" in (error as any).error
    ) {
      const errorObj = (error as any).error as {
        data?: { message?: string; error?: { message?: string } };
      };

      if (errorObj.data?.message) {
        return errorObj.data.message;
      }

      if (errorObj.data?.error?.message) {
        return errorObj.data.error.message;
      }
    }
  }

  // Fallback error message
  return "An unexpected error occurred. Please try again.";
};

export const showError = (error: unknown): void => {
  const errorMessage = handleApiError(error);
  $message.error(errorMessage);
};

export const showSuccess = (successMessage: string): void => {
  $message.success(successMessage);
};
