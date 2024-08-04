import { SelectContentType } from "@/app/component/molecules/workflowSettings/ContentType";
import styles from "./index.module.scss";
import {
  ActionInput,
  InputArray,
} from "@/app/component/molecules/workflowSettings/ActionInput";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { useReactflowCustom } from "@/app/state-management/reactflow";
import { Action, ActionNames, MyNode } from "@/types/workflow";

interface ContentApprovalProps extends MyNode {
  data: Action<ActionNames.Content_Approval>;
}

export const ContentApproval: React.FC<ContentApprovalProps> = ({
  id,
  data,
}) => {
  const { setNodes } = useReactflowCustom();

  const handleApproval = (approval: string, action: "add" | "remove") => {
    if (action === "add") {
      const newAproval = [...data.actionParameters.approvers];
      newAproval.push(approval);
      setNodes((prevNode) => {
        const newNodes = JSON.parse(JSON.stringify(prevNode));
        newNodes.forEach((node: any) => {
          if (node.id === id) {
            node.data.actionParameters.approvers = newAproval;
          }
        });

        return newNodes;
      });
    }
    if (action === "remove") {
      const newAproval = [...data.actionParameters.approvers].filter(
        (item: any) => item !== approval
      );
      setNodes((prevNode) => {
        const newNodes = JSON.parse(JSON.stringify(prevNode));
        newNodes.forEach((node: any) => {
          if (node.id === id) {
            node.data.actionParameters.approvers = newAproval;
          }
        });

        return newNodes;
      });
    }
  };

  return (
    <div>
      <Heading customStyles={styles["Heading"]}>{data.actionName}</Heading>
      <LabelParagraph>{data.description}</LabelParagraph>
      <div>
        <ActionInput
          title="Input"
          type="text"
          name="input"
          value={data.actionParameters.input}
          handleChange={() => ""}
        />
        <InputArray
          title="Approvals"
          description="Add the address of persons to receive the content for approval"
          valueList={data.actionParameters.approvers}
          handleChange={handleApproval}
        />
        <SelectContentType
          title="Content Type"
          description="Select the type of content generated"
          type="text"
          name="contentType"
          value={data.actionParameters.contentType}
          handleChange={() => ""}
        />
        <SelectContentType
          title="Notification Channel"
          description="Select the channel to receive the generated content"
          type="text"
          name="notificationChannel"
          value={data.actionParameters.notificationChannel}
          handleChange={() => ""}
        />
      </div>
    </div>
  );
};
