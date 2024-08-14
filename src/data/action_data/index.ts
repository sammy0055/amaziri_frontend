import { ActionType } from "@/types/workflow";
import { IconType } from "react-icons";
import { BsTools } from "react-icons/bs";
import { RiRobot3Line } from "react-icons/ri";

export const IconArray: {
    [key: string]: {
      color: string;
      Icon: IconType;
    };
  } = {
    [ActionType.ASSISTANTS]: {
      color: "green",
      Icon: RiRobot3Line,
    },
    [ActionType.AI]: {
      color: "green",
      Icon: RiRobot3Line,
    },
    [ActionType.TOOLING]: {
      color: "red",
      Icon: BsTools,
    },
  };