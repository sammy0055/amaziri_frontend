import { gql } from "@apollo/client";

export const WORKFLOW_SUBSCRIPTION_SCHEMA = gql`
  subscription Test($workflowId: UNIQUEID!) {
    workflowProcess(workflowId: $workflowId) {
      node {
        id
        data {
          actionName
          result
        }
      }
    }
  }
`;
