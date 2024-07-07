import { useErrorState } from "@/app/state-management/utility-state";
import { AlertColors } from "@/types/common";

export const useAlertHandler = () => {
  const [{ isAlertActive, message: alertMessage, color }, setAlertMessage] =
    useErrorState();

  const openAndCloseAlertCard = () =>
    setAlertMessage((prevState) => {
      return { ...prevState, isAlertActive: !prevState.isAlertActive };
    });

  const handleAlertMessage = (message: string, color?: AlertColors) => {
    setAlertMessage((prevState) => {
      return {
        ...prevState,
        isAlertActive: true,
        message,
        color: color || "neutral",
      };
    });
  };

  return {
    color,
    alertMessage,
    isAlertActive,
    handleAlertMessage,
    openAndCloseAlertCard,
  };
};
