import {
  SelectContentType,
  SelectNotificationChannel,
} from "@/app/component/molecules/workflowSettings/ContentType";
import styles from "./index.module.scss";
import {
  ActionInput,
  InputArray,
} from "@/app/component/molecules/workflowSettings/ActionInput";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { useReactflowCustom } from "@/app/state-management/reactflow";
import {
  Action,
  ActionNames,
  contentType,
  MyNode,
  NotificationChannels,
} from "@/types/workflow";
import { useWorkflowValidation } from "@/app/hooks/workflow/validation";
import { useActiveNodesValidationState } from "@/app/state-management/utility-state";

interface ContentApprovalProps extends MyNode {
  data: Action<ActionNames.Content_Approval>;
}

export const ContentApproval: React.FC<ContentApprovalProps> = ({
  id,
  data,
}) => {
  const { setNodes, nodes } = useReactflowCustom();
  const { contentApprovalValidation } = useWorkflowValidation();
  const [_, setValidNodes] = useActiveNodesValidationState();
  const newNodes = JSON.parse(JSON.stringify(nodes)) as MyNode[];
  const processValidationFn = () => {
    const { inProcessValidation } = contentApprovalValidation(id);
    const validation = inProcessValidation(newNodes);

    if (validation) {
      setValidNodes((prevNodes) => {
        if (prevNodes.includes(id)) return prevNodes;
        return [...prevNodes, id];
      });
    } else {
      setValidNodes((prevNodes) =>
        [...prevNodes].filter((nodeId) => nodeId !== id)
      );
    }
  };

  const handleApproval = (approval: string, action: "add" | "remove") => {
    if (action === "add") {
      setNodes(() => {
        newNodes.forEach((node: ContentApprovalProps) => {
          if (node.id === id) {
            const newAproval = [...data.actionParameters.approvers, approval];
            node.data.actionParameters.approvers = newAproval;
          }
        });

        return newNodes;
      });
    }
    if (action === "remove") {
      setNodes(() => {
        newNodes.forEach((node: ContentApprovalProps) => {
          if (node.id === id) {
            const newAproval = [...node.data.actionParameters.approvers].filter(
              (item: any) => item !== approval
            );
            node.data.actionParameters.approvers = newAproval;
          }
        });

        return newNodes;
      });
    }
    processValidationFn();
  };

  const handleSelectContentType = (contentType: contentType) => {
    setNodes(() => {
      newNodes.forEach((node: ContentApprovalProps) => {
        if (node.id === id) {
          node.data.actionParameters.contentType = contentType;
        }
      });
      return newNodes;
    });
    processValidationFn();
  };

  const handleSelecNotification = (
    notificationChannel: NotificationChannels
  ) => {
    setNodes(() => {
      newNodes.forEach((node: ContentApprovalProps) => {
        if (node.id === id) {
          node.data.actionParameters.notificationChannel = notificationChannel;
        }
      });
      return newNodes;
    });
    processValidationFn();
  };

  return (
    <div>
      <Heading customStyles={styles["Heading"]}>{data.actionName}</Heading>
      <LabelParagraph>{data.description}</LabelParagraph>
      <div>
        {data.isInputRequired && (
          <ActionInput
            title="Input"
            type="text"
            name="input"
            value={data.actionParameters.input}
            handleChange={() => ""}
          />
        )}
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
          handleChange={handleSelectContentType}
        />
        <SelectNotificationChannel
          title="Notification Channel"
          description="Select the channel to receive the generated content"
          type="text"
          name="notificationChannel"
          value={data.actionParameters.notificationChannel}
          handleChange={handleSelecNotification}
        />
      </div>
    </div>
  );
};
