import { useAlertHandler } from "./alert";

export const useErrorHandler = () => {
  const { errorMessage, handleErrorMessage } = useAlertHandler();
  const handleError = (error: any) => {
    handleErrorMessage(error?.message || "");
    console.log("errors", errorMessage);
  };

  return { handleError };
};
