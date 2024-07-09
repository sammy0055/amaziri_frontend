"use server";

import { AssistantInput, AssistantPayload } from "@/types/assistant";
import { gqlServerMutation } from "../gql";
import { addAssistantSchema } from "@/app/graphql/mutation/assistant";

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
