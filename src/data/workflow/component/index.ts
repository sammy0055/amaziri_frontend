import { ActionType } from "@/types/workflow";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";

export const IconArray: {
  [key: string]: {
    color: string;
    Icon: any;
  };
} = {
  [ActionType.ASSISTANTS]: {
    color: "green",
    Icon: import("react-icons/ri").then(({ RiRobot3Line }) => RiRobot3Line),
  },
  [ActionType.AI]: {
    color: "green",
    Icon: import("react-icons/ri").then(({ RiRobot3Line }) => RiRobot3Line),
  },
  [ActionType.TOOLING]: {
    color: "red",
    Icon: import("react-icons/bs").then(({ BsTools }) => BsTools),
  },
};
