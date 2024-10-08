import { gql } from "@apollo/client";

const getKnowledgeVaultsSchema = gql`
  query GetKnowledgeVaults {
    getKnowledgeVaults {
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

export {getKnowledgeVaultsSchema}
