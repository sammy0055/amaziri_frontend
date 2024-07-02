import { gql } from "@apollo/client";
export const addKnowledgeBaseSchema = gql`
  mutation CreateKnowledgeVault($vaultData: KnowledgeVaultInput!) {
    createKnowledgeVault(knowledgeVaultInputData: $vaultData) {
      code
      message
      data {
        _id
        name
        organization
      }
    }
  }
`;

export const updateKnowledgeBaseSchema = gql`
  mutation UpdateKnowledgeBase($vaultData: KnowledgeVaultUpdateInput) {
    updateKnowledgeVault(knowledgeVaultInputData: $vaultData) {
      success
      message
      code
      data {
        _id
        name
        documents {
          _id
          newFileName
          originalFileName
        }
      }
    }
  }
`;

export const deleteKnowledgeBaseSchema = gql`
mutation RemoveKnowledgeVault($vaultId:UNIQUEID!){
    removeKnowledgeVault(KnowledgeVaultId:$vaultId)
}
`