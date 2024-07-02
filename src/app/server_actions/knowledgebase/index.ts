"use server";

import {
  addKnowledgeBaseSchema,
  deleteKnowledgeBaseSchema,
  updateKnowledgeBaseSchema,
} from "@/app/graphql/mutation/knowledgebase";
import { gqlServerMutation } from "../gql";
import { KnowledgeVault, KnowledgeVaultPayload } from "@/types/knowledgebase";

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
