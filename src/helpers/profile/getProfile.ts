import { profileSchema } from "@/app/graphql/query/profile";
import { gqlServerQuery } from "@/app/server_actions/gql";
import { ProfilePayload } from "@/types/common";

export const isProfileComplete = async () => {
  const payload = await gqlServerQuery<{ getProfile: ProfilePayload }>(
    profileSchema
  );
  const data = payload.data.getProfile.data;
  if (!data) throw new Error("something went wrong");
  return Object.values(data).every(
    (value) => value !== null && value !== undefined
  );
};
