import styles from "./index.module.scss";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { InputArray } from "@/app/component/molecules/workflowSettings/ActionInput";
import { SelectContentType } from "@/app/component/molecules/workflowSettings/ContentType";
import { Prompt } from "@/app/component/molecules/workflowSettings/PromptAndInput";
import { SelectAssistant } from "@/app/component/molecules/workflowSettings/SelectAssistant";
import { useReactflowCustom } from "@/app/state-management/reactflow";
import { Action, ActionNames, MyNode } from "@/types/workflow";

interface ContentGenerationProps extends MyNode {
  data: Action<ActionNames.Content_Generation>;
}
export const ContentGeneration: React.FC<ContentGenerationProps> = ({
  data,
  id,
}) => {
  const { setNodes } = useReactflowCustom();
  const handleInput = (input: string, action: "add" | "remove") => {
    if (action === "add") {
      const newInput = [...data.actionParameters.input];
      newInput.push(input);
      setNodes((prevNodes) => {
        const newNodes = JSON.parse(JSON.stringify(prevNodes));
        newNodes.forEach((node: any) => {
          if (node.id === id) {
            node.data.actionParameters.input = newInput;
          }
        });

        return newNodes;
      });
    }

    if (action === "remove") {
      const newInput = [...data.actionParameters.input].filter(
        (item: any) => item !== input
      );
      setNodes((prevNodes) => {
        const newNodes = JSON.parse(JSON.stringify(prevNodes));
        newNodes.forEach((node: any) => {
          if (node.id === id) {
            node.data.actionParameters.input = newInput;
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
        {!data.isInputRequired && (
          <InputArray
            title="input"
            description="Add suggestion ideas"
            valueList={data.actionParameters.input}
            handleChange={handleInput}
          />
        )}

        <SelectAssistant
          title="Assistant"
          description=" Select the Amaziri Assistant (with the appropriate context) to use for
            generating the response."
          value=""
          handleChange={() => ""}
        />

        <Prompt
          title="Prompt"
          description="The prompt to send to the Assistant. This should include any
            instructions and additional context the model would need."
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
