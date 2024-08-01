"use client";
import styles from "./index.module.scss";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { Prompt } from "@/app/component/molecules/workflowSettings/PromptAndInput";
import { Action, ActionNames, MyNode } from "@/types/workflow";
import { SelectContentType } from "@/app/component/molecules/workflowSettings/ContentType";
import { SelectAssistant } from "@/app/component/molecules/workflowSettings/SelectAssistant";
import {
  ActionInput,
  AddApprovals,
} from "@/app/component/molecules/workflowSettings/ActionInput";
import { Node, useReactFlow } from "@xyflow/react";
import { useState } from "react";
interface ContentSuggestionProps extends MyNode {
  data: Action<ActionNames.Content_Suggestion>;
}
export const ContentSuggestion: React.FC<ContentSuggestionProps> = ({
  data,
}) => {
  return (
    <div>
      <Heading customStyles={styles["Heading"]}>{data.actionName}</Heading>
      <LabelParagraph>{data.description}</LabelParagraph>
      <div>
        <ActionInput
          title="Input"
          type="text"
          name="prompt"
          value=""
          handleChange={() => ""}
        />

        <Prompt
          title="Prompt"
          description="The prompt to send to the Assistant. This should include any
          instructions and additional context the model would need."
          type="text"
          name="prompt"
          value=""
          handleChange={() => ""}
        />

        <SelectAssistant
          title="Assistant"
          description=" Select the Amaziri Assistant (with the appropriate context) to use for
          generating the response."
          type="text"
          name="prompt"
          value=""
          handleChange={() => ""}
        />
      </div>
    </div>
  );
};

interface ContentGenerationProps extends MyNode {
  data: Action<ActionNames.Content_Generation>;
}
export const ContentGeneration: React.FC<ContentGenerationProps> = ({
  data,
}) => {
  return (
    <div>
      <Heading customStyles={styles["Heading"]}>{data.actionName}</Heading>
      <LabelParagraph>{data.description}</LabelParagraph>
      <div>
        <ActionInput
          title="Input"
          type="text"
          name="prompt"
          value=""
          handleChange={() => ""}
        />

        <SelectAssistant
          title="Assistant"
          description=" Select the Amaziri Assistant (with the appropriate context) to use for
          generating the response."
          type="text"
          name="prompt"
          value=""
          handleChange={() => ""}
        />

        <Prompt
          title="Prompt"
          description="The prompt to send to the Assistant. This should include any
          instructions and additional context the model would need."
          type="text"
          name="prompt"
          value=""
          handleChange={() => ""}
        />

        <SelectContentType
          title="Content Type"
          description="Select the type of content to generated"
          type="text"
          name="prompt"
          value=""
          handleChange={() => ""}
        />
      </div>
    </div>
  );
};

interface ContentApprovalProps extends MyNode {
  data: Action<ActionNames.Content_Approval>;
}

export const ContentApproval: React.FC<ContentApprovalProps> = ({
  id,
  data,
}) => {
  const [input, SetInput] = useState();
  const { setNodes, getNodes, getEdges } = useReactFlow();

  const handleApproval = (data: string) => {
    setNodes((prevNodes: Node[]) => {
      prevNodes.forEach((node: any) => {
        if (node.id === id) {
          node.data.actionParameters.approvers.push(data);
        }
      });
      console.log("===data===========");
      console.log(prevNodes);
      console.log("====================================");
      return prevNodes;
    });
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
        <AddApprovals
          title="Approvals"
          description="Add the address of persons to receive the content for approval"
          approvers={data.actionParameters.approvers}
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
