import { gql } from "@apollo/client";

export const addAssistantSchema = gql`
  mutation CreateAssistant($assistantData: AssistantInput!) {
    createAssistant(AssistantInputData: $assistantData) {
      code
      data {
        _id
        name
        description
        brandVoice
        type
        knowledgeVault
        instructions
        organization
      }
    }
  }
`;

export const editAssistantSchema = gql`
  mutation UpdateAssistant($assistantData: AssistantUpdateInput!) {
    updateAssistant(AssistantInputData: $assistantData) {
      code
      data {
        _id
        name
        description
        brandVoice
        type
        knowledgeVault
        instructions
        organization
      }
    }
  }
`;

export const getAssistantsSchema = gql`
  query GetAssistants {
    getAssistants {
      data {
        __typename
        _id
        name
        description
        brandVoice
        type
        knowledgeVault
        instructions
      }
    }
  }
`;
