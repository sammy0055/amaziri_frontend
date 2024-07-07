export interface AssistantInput {
  name: string;
  description: string;
  type: "Q&A" | "";
  brandVoice: string;
  knowledgeVault: string[];
  instructions: string[];
}
