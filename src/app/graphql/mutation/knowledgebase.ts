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
        documents {
          _id
          newFileName
          originalFileName
          updatedAt
          createdAt
        }
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
          updatedAt
          createdAt
        }
      }
    }
  }
`;

export const deleteKnowledgeBaseSchema = gql`
  mutation RemoveKnowledgeVault($vaultId: UNIQUEID!) {
    removeKnowledgeVault(KnowledgeVaultId: $vaultId)
  }
`;

export const addDocumentSchema = gql`
  mutation UploadDocument($DocumentData: DocumentInput!) {
    uploadDocument(uploadDocumentInputData: $DocumentData) {
      code
      message
      data {
        _id
        uploadUrl
        originalFileName
        newFileName
        createdAt
        updatedAt
      }
    }
  }
`;

export const addDocumentToVectorStoreSchema = gql`
  mutation AddDocumentToVectorStore($DocumentData: DocumentQueryInput!) {
    addDocumentToVectorStore(Document: $DocumentData)
  }
`;

export const removeDocumentSchema = gql`
  mutation RemoveDocument($documentId: UNIQUEID!) {
    removeDocument(DocumentId: $documentId)
  }
`;
