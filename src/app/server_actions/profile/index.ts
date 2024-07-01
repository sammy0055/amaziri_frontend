"use server";

import { profileSetupMutationSchema } from "@/app/graphql/mutation/profile";
import { gqlServerMutation } from "../gql";
import { ProfilePayload } from "@/types/common";

type ProfilePayloadType = { updateProfile: ProfilePayload };
export const profileSetup = async (data: any) => {
  const mutation = await gqlServerMutation(); // Initialize the mutation function
  const payload = await mutation<ProfilePayloadType>(
    profileSetupMutationSchema,
    {
      profileData: { firstName: data.firstName, lastName: data.lastName },
      organizationData: { name: data.organization },
    }
  );

  return payload;
};
