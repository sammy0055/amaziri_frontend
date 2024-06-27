import { gql } from "@apollo/client";

export const profileSchema = gql`
  query Profile {
    getProfile {
      data {
        organizations
        email
        firstName
        lastName
      }
    }
  }
`;
