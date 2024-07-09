"use server";

import {
  addDocumentSchema,
  addDocumentToVectorStoreSchema,
  addKnowledgeBaseSchema,
  deleteKnowledgeBaseSchema,
  removeDocumentSchema,
  updateKnowledgeBaseSchema,
} from "@/app/graphql/mutation/knowledgebase";
import { gqlServerMutation, gqlServerQuery } from "../gql";
import {
  AddDocumentInput,
  Document,
  DocumentPayload,
  KnowledgeVault,
  KnowledgeVaultPayload,
  KnowledgeVaultsPayload,
} from "@/types/knowledgebase";
import { getKnowledgeVaultsSchema } from "@/app/graphql/query/knowledge-base";

export const getKnowledgeBase = async (token?: string) => {
  const serverQuery = await gqlServerQuery();
  const res = await serverQuery<{
    getKnowledgeVaults: KnowledgeVaultsPayload;
  }>(getKnowledgeVaultsSchema, null, token);
  return res.data.getKnowledgeVaults;
};

export const addKnowledgeBase = async (
  data: { name: string },
  token?: string
) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{
    createKnowledgeVault: KnowledgeVaultPayload;
  }>(
    addKnowledgeBaseSchema,
    {
      vaultData: data,
    },
    token
  );

  return payload.data?.createKnowledgeVault;
};

export const updateKnowledgeBase = async (
  data: Pick<KnowledgeVault, "_id" | "name">,
  token?: string
) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{
    updateKnowledgeVault: KnowledgeVaultPayload;
  }>(
    updateKnowledgeBaseSchema,
    {
      vaultData: data,
    },
    token
  );

  return payload.data?.updateKnowledgeVault;
};

export const removeKnowledgeBase = async (
  data: Pick<KnowledgeVault, "_id">,
  token?: string
) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{
    removeKnowledgeVault: KnowledgeVaultPayload;
  }>(
    deleteKnowledgeBaseSchema,
    {
      vaultId: data._id,
    },
    token
  );

  return payload.data?.removeKnowledgeVault;
};

//------------------------ document section --------------------

export const addDocumentToKnowledgeBase = async (
  data: AddDocumentInput,
  token?: string
) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{
    uploadDocument: DocumentPayload;
  }>(
    addDocumentSchema,
    {
      DocumentData: data,
    },
    token
  );
  return payload.data?.uploadDocument;
};

export const addDocumentToVectorStore = async (
  data: {
    _id: string;
    fileName: string;
  },
  token?: string
) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{ uploadDocument: any }>(
    addDocumentToVectorStoreSchema,
    {
      DocumentData: data,
    },
    token
  );

  return payload.data?.uploadDocument;
};

export const removeDocument = async (_id: string, token?: string) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation(
    removeDocumentSchema,
    {
      documentId: _id,
    },
    token
  );
  return payload.data;
};
