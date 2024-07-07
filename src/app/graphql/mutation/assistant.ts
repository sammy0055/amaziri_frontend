import { gql } from "@apollo/client";

export const addAssistantSchema = gql`
  mutation CreateAssistant($assistantData: AssistantInput!) {
    createAssistant(AssistantInputData: $assistantData) {
      code
      data {
        _id
        brandVoice
        knowledgeVault
        organization
      }
    }
  }
`;
