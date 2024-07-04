"use server";

import {
  addDocumentSchema,
  addDocumentToVectorStoreSchema,
  addKnowledgeBaseSchema,
  deleteKnowledgeBaseSchema,
  removeDocumentSchema,
  updateKnowledgeBaseSchema,
} from "@/app/graphql/mutation/knowledgebase";
import { gqlServerMutation } from "../gql";
import {
  AddDocumentInput,
  Document,
  DocumentPayload,
  KnowledgeVault,
  KnowledgeVaultPayload,
} from "@/types/knowledgebase";

export const addKnowledgeBase = async (data: { name: string }) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{
    createKnowledgeVault: KnowledgeVaultPayload;
  }>(addKnowledgeBaseSchema, {
    vaultData: data,
  });

  return payload.data?.createKnowledgeVault;
};

export const updateKnowledgeBase = async (
  data: Pick<KnowledgeVault, "_id" | "name">
) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{
    updateKnowledgeVault: KnowledgeVaultPayload;
  }>(updateKnowledgeBaseSchema, {
    vaultData: data,
  });

  return payload.data?.updateKnowledgeVault;
};

export const removeKnowledgeBase = async (
  data: Pick<KnowledgeVault, "_id">
) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{
    removeKnowledgeVault: KnowledgeVaultPayload;
  }>(deleteKnowledgeBaseSchema, {
    vaultId: data._id,
  });

  return payload.data?.removeKnowledgeVault;
};

//------------------------ document section --------------------

export const addDocumentToKnowledgeBase = async (data: AddDocumentInput) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{
    uploadDocument: DocumentPayload;
  }>(addDocumentSchema, {
    DocumentData: data,
  });
  return payload.data?.uploadDocument;
};

export const addDocumentToVectorStore = async (data: {
  _id: string;
  fileName: string;
}) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{ uploadDocument: any }>(
    addDocumentToVectorStoreSchema,
    {
      DocumentData: data,
    }
  );

  return payload.data?.uploadDocument;
};

export const removeDocument = async (_id: string) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation(removeDocumentSchema, {
    documentId: _id,
  });
  return payload.data;
};
