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
        }
      }
    }
  }
`;

export {getKnowledgeVaultsSchema}
