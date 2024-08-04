import { v4 } from "uuid";
import { atom, useRecoilState } from "recoil";
import { AlertColors } from "@/types/common";
import React, { ReactNode } from "react";
import { Workflow } from "@/types/workflow";

const ErrorState = atom<{
  isAlertActive: boolean;
  message: string;
  color: AlertColors;
}>({
  default: {
    isAlertActive: false,
    message: "",
    color: "neutral",
  },
  key: v4(),
});

export const useErrorState = () => useRecoilState(ErrorState);

const popup = atom({
  key: v4(),
  default: false,
});

export const useOpenAndClosePopUp = () => useRecoilState(popup);

export const sidebartoggle = atom({
  key: v4(),
  default: false,
});

export const useSidbarState = () => useRecoilState(sidebartoggle);

interface workflowSettingsComponentProps {
  isOpen: boolean;
  component: ReactNode;
}

const workflowCanvasSettingsPanel = atom<workflowSettingsComponentProps>({
  key: v4(),
  default: {
    isOpen: false,
    component: "",
  },
});

export const useWorkflowCanvasSettingsPanelState = () =>
  useRecoilState(workflowCanvasSettingsPanel);

 const activeNodesValidation = atom<string[]>({
  key: v4(),
  default: [],
});

export const useActiveNodesValidationState = () => useRecoilState(activeNodesValidation)
