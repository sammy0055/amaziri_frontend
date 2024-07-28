import { Option, Select } from "@mui/joy";
import styles from "./index.module.scss";
import { actions } from "@/data/workflow/actions";
import { useWorkflow } from "@/app/hooks/workflow";

export const SelectNode = () => {
  const { sendworkflowData, HandleSelectNode } = useWorkflow();

  const showState = () => {
    sendworkflowData();
  };

  return (
    <div className={styles["Container"]}>
      <div>
        <button onClick={showState}>show node state</button>
      </div>
      <Select defaultValue={"select actions"}>
        {actions.map((node) => (
          <Option
            key={node.id}
            value={node.id}
            onClick={() => HandleSelectNode(node)}
          >
            {node.data.actionName}
          </Option>
        ))}
      </Select>
    </div>
  );
};
