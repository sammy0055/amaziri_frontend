import { Position } from "@xyflow/react";
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
import { useReactflowCustom } from "@/app/state-management/reactflow";
import { Badge } from "@mui/joy";
import { useActiveNodesValidationState } from "@/app/state-management/utility-state";

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
  const { setNodes, nodes } = useReactflowCustom();
  const [validNodes] = useActiveNodesValidationState();
  const { WorflowSettingsComponent, inputRequired } = useWorkflow();
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
    const lastNode = nodes[nodes.length - 1];
    return lastNode.id === id;
  };

  const handleSettingsComponent = () => {
    const isInputRequired = inputRequired(id);
    const Component = SettingsComponent[data.actionName];
    if (!Component) WorflowSettingsComponent(<div></div>);
    else {
      const updated = {
        ...node,
        data: { ...node.data, isInputRequired: isInputRequired ? true : false },
      };
      WorflowSettingsComponent(<Component {...updated} />);
    }
  };

  return (
    <div className={styles["CustomNodeContainer"]}>
      {/* <button onClick={HandleDeleteNode} className="nodrag">
        delete
      </button> */}
      <div
        className={styles["CustomNode"]}
        style={{ backgroundColor: color }}
        onClick={handleSettingsComponent}
      >
        <Badge
          className={styles["CustomNodeBade"]}
          color={validNodes.includes(id) ? "success" : "danger"}
        />
        <Icon className={`${styles["CustomNodeIcon"]}`} />
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
    </div>
  );
};
