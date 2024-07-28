import { gql } from "@apollo/client";

export const addWorkflowSchema = gql`
  mutation AddWorkflow($input: WorkflowInput!) {
    addWorkflow(workflowInput: $input)
  }
`;
