import { useErrorState } from "@/app/state-management/utility-state";

export const useAlertHandler = () => {
  const [{ isError: isErrorActive, message: errorMessage }, setErrorMessage] =
    useErrorState();

  const openAndCloseErrorCard = () =>
    setErrorMessage((prevState) => {
      return { ...prevState, isError: !prevState.isError };
    });

  const handleErrorMessage = (message: string) => {
    setErrorMessage((prevState) => {
      return { ...prevState, isError: true, message };
    });
  };
  
  return {
    errorMessage,
    isErrorActive,
    handleErrorMessage,
    openAndCloseErrorCard,
  };
};
