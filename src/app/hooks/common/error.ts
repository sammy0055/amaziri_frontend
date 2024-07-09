import { useAlertHandler } from "./alert";

export const useErrorHandler = () => {
  const { alertMessage, handleAlertMessage } = useAlertHandler();
  const handleError = (error: any) => {
    handleAlertMessage(error?.message || "");
    console.log("errors", alertMessage);
  };

  return { handleError };
};
