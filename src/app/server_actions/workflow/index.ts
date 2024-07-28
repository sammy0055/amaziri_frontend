"use server";

import { ReactFlowTypes } from "@/types/workflow";
import { gqlServerMutation } from "../gql";
import { addWorkflowSchema } from "@/app/graphql/mutation/workflow";
import { WorkflowPayload } from "@/types/workflow/payload";

interface addWorkflowtypes {
  workflowName: string;
  steps: ReactFlowTypes;
}

export const addWorkflow = async (data: addWorkflowtypes, token?: string) => {
  const mutation = await gqlServerMutation();
  const payload = await mutation<{ addWorkflow: WorkflowPayload }>(
    addWorkflowSchema,
    {
      input: data,
    },
    token
  );
  return payload?.data?.addWorkflow;
};
