import { v4 } from "uuid";
import { atom, useRecoilState } from "recoil";

const ErrorState = atom({
  default: {
    isError: false,
    message: "",
  },
  key: v4(),
});

export const useErrorState = () => useRecoilState(ErrorState);

const popup = atom({
  key: v4(),
  default: false,
});

export const useOpenAndClosePopUp = () => useRecoilState(popup);
