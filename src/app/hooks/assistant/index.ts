import { useCreateAssistantState } from "@/app/state-management/assistant";
import { useOpenAndClosePopUp } from "@/app/state-management/utility-state";
import { ChangeEvent } from "react";
import { useAlertHandler } from "../common/alert";

export const useAssistant = () => {
  const [open, setOpen] = useOpenAndClosePopUp();
  const [assistantInputData, setAssistantInputData] = useCreateAssistantState();
  const { handleAlertMessage } = useAlertHandler();
  const startCreateAssistantProcess = () => setOpen(true);

  const handleAssistantChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "instructions")
      setAssistantInputData((prevState) => ({ ...prevState, [name]: [value] }));
    if (name !== "instructions")
      setAssistantInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const selectAssistantType = (type: "Q&A" | "") => {
    setAssistantInputData((prevState) => {
      return { ...prevState, type: type };
    });
  };

  const validateRequiredFields = () => {
    if (!assistantInputData.name) {
      handleAlertMessage("name field most not be empty", "warning");
      return false;
    } else if (!assistantInputData.description) {
      handleAlertMessage("description field most not be empty", "warning");
      return false;
    }
    return true;
  };

  return {
    assistantInputData,
    handleAssistantChange,
    startCreateAssistantProcess,
    validateRequiredFields,
    selectAssistantType,
  };
};
