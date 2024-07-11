import { PayloadStatus } from "../common";

export interface Assistant {
  _id: string;
  name: string;
  description: string;
  type: "Q&A" | "NONE";
  brandVoice: string;
  knowledgeVault: string[];
  instructions: string[];
}
export interface AssistantInput extends Omit<Assistant, "_id"> {
  _id?: string;
}

export interface AssistantPayload extends PayloadStatus {
  data: Assistant;
}

export interface AssistantsPayload extends PayloadStatus {
  data: Assistant[];
}

export interface AssistantChat {
  _id: string;
  queryText: string;
  allChats: { queryText?: string; systemResponse?: string }[];
}
