import { Action, ActionNames, MyNode } from "@/types/workflow";
import { v4 } from "uuid";

const Content_Suggestion: Action<ActionNames.Content_Suggestion> = {
  actionName: ActionNames.Content_Suggestion,
  description: "Use AI to recommend content topics based on industry trends",
  actionType: "ASSISTANTS",
  isInputRequired: true,
  category: "Content Creation and Curation",
  actionParameters: {
    assistantId: "",
    internetSearch: false,
    input: [],
    prompt: "",
  },
};

const Content_Generation: Action<ActionNames.Content_Generation> = {
  actionName: ActionNames.Content_Generation,
  description: "Use AI to create engaging posts",
  actionType: "ASSISTANTS",
  isInputRequired: true,
  category: "Content Creation and Curation",
  actionParameters: {
    assistantId: "testing description",
    input: [],
    prompt: "testing description",
    contentType: "text",
  },
};

const Content_Approval: Action<ActionNames.Content_Approval> = {
  actionName: ActionNames.Content_Approval,
  description: "Route created content for review and approval",
  actionType: "TOOLING",
  isInputRequired: true,
  category: "Content Creation and Curation",
  actionParameters: {
    approvers: [],
    contentType: "text",
    input: "",
    notificationChannel: "email",
  },
};

interface ActionType {
  categories: {
    [key: string]: MyNode[];
  };
  allActions: () => MyNode[];
}

export const actions: ActionType = {
  categories: {
    contentCreation: [
      {
        id: v4(),
        position: { x: 60, y: 60 },
        data: Content_Suggestion,
      },
      {
        id: v4(),
        position: { x: 60, y: 60 },
        data: Content_Generation,
      },
      {
        id: v4(),
        position: { x: 60, y: 60 },
        data: Content_Approval,
      },
    ],
    tooling: [
      {
        id: v4(),
        position: { x: 60, y: 60 },
        data: Content_Approval,
      },
      {
        id: v4(),
        position: { x: 60, y: 60 },
        data: Content_Approval,
      },
    ],
  },
  allActions: function () {
    return [...this.categories.contentCreation, ...this.categories.tooling];
  },
};

export const allActions = actions.allActions();
