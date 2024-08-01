import { Position, useReactFlow } from "@xyflow/react";
import styles from "./index.module.scss";
import { CustomHandle } from "../customHandle";
import { Action, ActionNames, ActionType, MyNode } from "@/types/workflow";
import { Heading } from "@/app/component/atom/headings";
import { RiRobot3Line } from "react-icons/ri";
import { BsTools } from "react-icons/bs";
import { IconType } from "react-icons";
import Clock from "@/app/component/atom/svgclock";
import { useWorkflow } from "@/app/hooks/workflow";
import {
  ContentApproval,
  ContentGeneration,
  ContentSuggestion,
} from "../settings_component";

const IconArray: {
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

interface Custom extends MyNode {
  data: Action<any>;
}
export const CustomNode: React.FC<Custom> = (node) => {
  const { data, id } = node;
  const { setNodes, getNodes } = useReactFlow();
  const { WorflowSettingsComponent } = useWorkflow();
  const Icon = IconArray[data.actionType].Icon;
  const color = IconArray[data.actionType].color;

  const SettingsComponent: { [key: string]: any } = {
    [ActionNames.Content_Suggestion]: ContentSuggestion,
    [ActionNames.Content_Generation]: ContentGeneration,
    [ActionNames.Content_Approval]: ContentApproval,
  };
  const HandleDeleteNode = () =>
    setNodes((prevNode) => prevNode.filter((node) => node.id !== id));

  const isTrigger = data.trigger === true;

  const isLastNode = () => {
    const nodes = getNodes();
    const lastNode = nodes[nodes.length - 1];
    return lastNode.id === id;
  };

  const handleSettingsComponent = () => {
    const Component = SettingsComponent[data.actionName];
    if (!Component) return WorflowSettingsComponent(<div></div>);
    WorflowSettingsComponent(<Component {...node} />);
  };
  return (
    <>
      <div
        className={styles["CustomNode"]}
        style={{ backgroundColor: color }}
        onClick={handleSettingsComponent}
      >
        <Icon className={`${styles["CustomNodeIcon"]}`} />
        {/* <button onClick={HandleDeleteNode}>delete</button> */}
        <CustomHandle color={color} type="target" position={Position.Left} />
        <CustomHandle color={color} type="source" position={Position.Right} />
        {isTrigger && (
          <div className={styles["ClockContainer"]}>
            <Clock color={color} className={`${styles["Clock"]}`} />
          </div>
        )}
      </div>
      <div>
        <Heading customStyles={styles["TitleHeading"]}>
          {data.actionName}
        </Heading>
      </div>
    </>
  );
};
