import { useReactflowCustom } from "@/app/state-management/reactflow";
import {
  Action,
  ActionNames,
  ActionParametersType,
  MyNode,
} from "@/types/workflow";

interface dataType<T extends keyof ActionParametersType> extends MyNode {
  data: Action<T>;
}

type validationDataType<T extends keyof ActionParametersType> =
  | dataType<T>
  | undefined;

export const useWorkflowValidation = () => {
  //   const { nodes } = useReactflowCustom();

  interface validationResponse {
    status: boolean;
    message: string;
  }

  const isInputValid = (
    data: Action<ActionNames.Content_Suggestion>
  ): validationResponse => {
    const { input } = data.actionParameters;
    if (!data.isInputRequired) return { status: true, message: "" };
    if (input.length === 0) {
      return {
        status: false,
        message: "input is empty, please add an input",
      };
    }
    return { status: true, message: "" };
  };

  const isAssistantAndPromptValid = (
    data: Action<ActionNames.Content_Suggestion>
  ): validationResponse => {
    const { assistantId, prompt } = data.actionParameters;
    if (assistantId && prompt) return { status: true, message: "" };
    else
      return {
        status: false,
        message: assistantId
          ? "prompt most not be empty"
          : "choose your assistant",
      };
  };

  const isContentTypeValid = (
    data: Action<ActionNames.Content_Generation>
  ): validationResponse => {
    if (data.actionParameters.contentType) return { status: true, message: "" };
    return {
      status: false,
      message: "select the type of content you want to generate",
    };
  };

  const contentSuggestionValidation = (id: string) => {
    const inProcessValidation = (nodes: MyNode[]) => {
      const node = nodes.find(
        (node) => node.id === id
      ) as validationDataType<ActionNames.Content_Suggestion>;
      if (!node) throw new Error("something went wrong");
      const { data } = node;
      const input = isInputValid(data);
      const isValid = [input, isAssistantAndPromptValid(data)].every(
        (item) => item.status === true
      );

      return isValid;
    };

    return { inProcessValidation };
  };

  const contentGenerationValidation = (id: string) => {
    const inProcessValidation = (nodes: MyNode[]) => {
      const node = nodes.find(
        (node) => node.id === id
      ) as validationDataType<any>;
      if (!node) throw new Error("something went wrong");
      const { data } = node;
      const isValid = [
        isInputValid(data),
        isAssistantAndPromptValid(data),
        isContentTypeValid(data),
      ].every((item) => item.status === true);
      return isValid;
    };

    return { inProcessValidation };
  };

  const contentApprovalValidation = (id: string) => {
    const isApprovalsValid = (
      data: Action<ActionNames.Content_Approval>
    ): validationResponse => {
      const { approvers } = data.actionParameters;
      if (approvers?.length === 0) {
        return {
          status: false,
          message: "input is empty, please add an input",
        };
      } else return { status: true, message: "" };
    };

    const isNotificationChannelValid = (
      data: Action<ActionNames.Content_Approval>
    ): validationResponse => {
      if (data?.actionParameters?.notificationChannel)
        return { status: true, message: "" };
      return { status: false, message: "notification channel is required" };
    };
    const inProcessValidation = (nodes: MyNode[]) => {
      const node = nodes.find(
        (node) => node.id === id
      ) as validationDataType<any>;
      if (!node) throw new Error("something went wrong");
      const { data } = node;
      const isValid = [
        isApprovalsValid(data),
        isContentTypeValid(data),
        isNotificationChannelValid(data),
      ].every((item) => item.status === true);
      return isValid;
    };

    return { inProcessValidation };
  };

  return {
    contentSuggestionValidation,
    contentGenerationValidation,
    contentApprovalValidation,
  };
};
