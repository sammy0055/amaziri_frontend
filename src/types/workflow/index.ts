export interface Action<T extends keyof ActionParametersType> {
  actionName: T;
  description: string;
  trigger?: boolean;
  isInputRequired: boolean;
  category: ActioCategoryUnion;
  actionType: ActionTypeUnion;
  actionParameters: ActionParametersType[T]; // Use appropriate types or interfaces for action parameters
}

type ActionTypeUnion = `${ActionType}`;
type ActioCategoryUnion = `${ActionCategory}`;

export enum ActionType {
  TRIGGER = "TRIGGER",
  WHATSAPP_MANAGER = "WHATSAPP_MANAGER",
  ACTIONS = "ACTIONS",
  DATA = "DATA",
  ASSISTANTS = "ASSISTANTS",
  AI = "AI",
  TOOLING = "TOOLING",
}

export enum ActionCategory {
  GENERAL = "GENERAL",
  INTEGRATIONS = "INTEGRATIONS",
  Content_Creation_and_Curation = "Content Creation and Curation",
  Campaign_Planning = "Campaign Planning",
  Scheduling_and_Publishing = "Scheduling and Publishing",
  Engagement_and_Interaction = "Engagement and Interaction",
  Analytics_and_Reporting = "Analytics and Reporting",
}

export enum ActionNames {
  SEND_MESSAGES = "SEND_WHATSAPP_MESSAGES",
  GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT = "GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT",
  Content_Suggestion = "Content Suggestion",
  Content_Generation = "Content Generation",
  Content_Approval = "Content Approval",
}

interface SendMessagesParams {
  whatsappPhoneNumberId: string;
  whatsappBusinessId: string;
  messages: string[];
}

interface KnowledgeBaseAssitantParams {
  systemPrompt: string;
  userPrompt: string;
  temperature: number;
  assistantId: string;
}

export interface ContentSuggestionParams {
  input: string[];
  assistantId: string;
  prompt: string;
  internetSearch: boolean;
}

export type contentType = "text" | "image" | "video";
export const contentTypeVaues = ["text", "image", "video"];
export type NotificationChannels = "whatsapp" | "email";
export const NotificationChannelsValues = ["email"];
export interface ContentGenerationParams {
  input: string[]; //Selected topics and ideas
  assistantId: string;
  prompt: string;
  contentType: contentType;
}

export interface ContentApprovalParams {
  input: string; //Created content.
  contentType: contentType;
  notificationChannel: NotificationChannels;
  approvers: string[];
}

export interface SubmitedContentType {
  organization: string;
  workflowId: string;
  approvals: string[];
  contentTypes: contentType[];
  content: {
    text: string;
    media: string;
  };
  approvalState: {
    approvedBy: string;
    approvedDate?: Date;
    isApproved: boolean;
  };
}

export type ActionParametersType = {
  [ActionNames.SEND_MESSAGES]: SendMessagesParams;
  [ActionNames.GENERATE_TEXT_WITH_KNOWLEDGEBASE_ASSISTANT]: KnowledgeBaseAssitantParams;
  [ActionNames.Content_Suggestion]: ContentSuggestionParams;
  [ActionNames.Content_Generation]: ContentGenerationParams;
  [ActionNames.Content_Approval]: ContentApprovalParams;
};

export interface MyNode {
  id: string;
  type?: string;
  measured?: { width?: number; height?: number };
  position: { x: number; y: number };
  data: any;
}

export interface MyEdges {
  id: string;
  source: string;
  target: string;
  type: string;
}

// Workflow model
export interface Workflow {
  organization?: any;
  workflowName: string;
  createdAt?: Date;
  updatedAt?: Date;
  steps: {
    nodes: MyNode[];
    edges: MyEdges[];
  };
}

export interface ReactFlowTypes {
  nodes: MyNode[];
  edges: MyEdges[];
}
