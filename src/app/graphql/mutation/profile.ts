import { gql } from "@apollo/client";

export const profileSetupMutationSchema = gql`
  mutation UpdateProfile(
    $profileData: ProfileInput!
    $organizationData: OrganizationProfileInput!
  ) {
    updateProfile(profileInputData: $profileData) {
      code
      success
      message
      data {
        email
        firstName
        lastName
        organizations
      }
    }

    organization {
      createOrganizationProfile(
        organizationProfileInputData: $organizationData
      ) {
        code
        message
        success
        data {
          name
          description
          _id
        }
      }
    }
  }
`;
