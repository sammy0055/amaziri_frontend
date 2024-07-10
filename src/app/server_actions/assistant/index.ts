"use server";

import { Assistant, AssistantInput, AssistantPayload } from "@/types/assistant";
import { gqlServerMutation } from "../gql";
import {
  addAssistantSchema,
  editAssistantSchema,
} from "@/app/graphql/mutation/assistant";

export const createAssistant = async (data: AssistantInput, token?: string) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{ createAssistant: AssistantPayload }>(
    addAssistantSchema,
    {
      assistantData: data,
    },
    token
  );

  return payload.data?.createAssistant;
};

export const editAssistant = async (data: Assistant, token?: string) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{ updateAssistant: AssistantPayload }>(
    editAssistantSchema,
    {
      assistantData: data,
    },
    token
  );

  return payload?.data?.updateAssistant;
};
