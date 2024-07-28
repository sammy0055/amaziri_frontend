import { NodeProps, Position, useReactFlow } from "@xyflow/react";
import styles from "./index.module.scss";
import { CustomHandle } from "../customHandle";
import { MyNode } from "@/types/workflow";

export const CustomNode: React.FC<MyNode> = ({ data, id }) => {
  const { setNodes } = useReactFlow();

  const HandleDeleteNode = () =>
    setNodes((prevNode) => prevNode.filter((node) => node.id !== id));
  return (
    <>
      <div className={styles["SuggestionContainer"]}>
        <span>{data.actionName}</span>
      </div>

      <button onClick={HandleDeleteNode}>delete</button>
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </>
  );
};
