import styles from "./index.module.scss";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { InputArray } from "@/app/component/molecules/workflowSettings/ActionInput";
import { Prompt } from "@/app/component/molecules/workflowSettings/PromptAndInput";
import { SelectAssistant } from "@/app/component/molecules/workflowSettings/SelectAssistant";
import { useWorkflowValidation } from "@/app/hooks/workflow/validation";
import { useReactflowCustom } from "@/app/state-management/reactflow";
import { useActiveNodesValidationState } from "@/app/state-management/utility-state";
import { Action, ActionNames, MyNode } from "@/types/workflow";

interface ContentSuggestionProps extends MyNode {
  data: Action<ActionNames.Content_Suggestion>;
}
export const ContentSuggestion: React.FC<ContentSuggestionProps> = ({
  data,
  id,
}) => {
  const { setNodes, nodes } = useReactflowCustom();
  const { contentSuggestionValidation } = useWorkflowValidation();
  const [_, setValidNodes] = useActiveNodesValidationState();
  const newNodes = JSON.parse(JSON.stringify(nodes)) as MyNode[];
  const processValidationFn = () => {
    const { inProcessValidation } = contentSuggestionValidation(id);
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

  const handleInput = (input: string, action: "add" | "remove") => {
    if (action === "add") {
      setNodes(() => {
        newNodes.forEach((node: ContentSuggestionProps) => {
          if (node.id === id) {
            const newInput = [...node.data.actionParameters.input, input];
            node.data.actionParameters.input = newInput;
          }
        });
        return newNodes;
      });
    }

    if (action === "remove") {
      setNodes(() => {
        newNodes.forEach((node: ContentSuggestionProps) => {
          if (node.id === id) {
            const newInput = [...node.data.actionParameters.input].filter(
              (item: any) => item !== input
            );
            node.data.actionParameters.input = newInput;
          }
        });

        return newNodes;
      });
    }
    processValidationFn();
  };

  const handlePrompt = (prompt: string) => {
    setNodes(() => {
      newNodes.forEach((node: ContentSuggestionProps) => {
        if (node.id === id) {
          node.data.actionParameters.prompt = prompt;
        }
      });
      return newNodes;
    });
    processValidationFn();
  };

  const handleSelectAssistant = (assistantId: string) => {
    setNodes(() => {
      newNodes.forEach((node: ContentSuggestionProps) => {
        if (node.id === id) {
          node.data.actionParameters.assistantId = assistantId;
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
          <InputArray
            title="input"
            description="Add industry trending topics"
            valueList={data.actionParameters.input}
            handleChange={handleInput}
          />
        )}

        <Prompt
          title="Prompt"
          description="The prompt to send to the Assistant. This should include any
            instructions and additional context the model would need."
          name="prompt"
          value={data.actionParameters.prompt}
          handleChange={handlePrompt}
        />

        <SelectAssistant
          title="Assistant"
          description=" Select the Amaziri Assistant (with the appropriate context) to use for
            generating the response."
          value={data.actionParameters.assistantId}
          handleChange={handleSelectAssistant}
        />
      </div>
    </div>
  );
};
