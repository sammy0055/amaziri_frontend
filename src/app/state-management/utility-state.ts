import { v4 } from "uuid";
import { atom, useRecoilState } from "recoil";
import { AlertColors } from "@/types/common";

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
