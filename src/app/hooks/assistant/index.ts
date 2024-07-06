import { useOpenAndClosePopUp } from "@/app/state-management/utility-state";

export const useAssistant = () => {
  const [open, setOpen] = useOpenAndClosePopUp();
  const startCreateAssistantProcess = () => setOpen(true);

  return {
    startCreateAssistantProcess,
  };
};
