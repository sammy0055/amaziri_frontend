"use server";
import { TypedDocumentNode } from "@apollo/client";
import { cookies } from "next/headers";
import { client } from "../../graphql";
import { LocalStorageVariables } from "@/types/common";

export const gqlServerQuery = async () => {
  const cookie = cookies();
  const IdToken = cookie.get(LocalStorageVariables.AMAZIRI_IDTOKEN);

  return async <T>(
    queryString: TypedDocumentNode,
    variables?: any,
    token?: string
  ) => {
    return await client.query<T>({
      query: queryString,
      variables: variables || {},
      context: {
        headers: {
          Authorization: token || IdToken?.value,
        },
      },
    });
  };
};

export const gqlServerMutation = async () => {
  const cookie = cookies();
  const IdToken = cookie.get(LocalStorageVariables.AMAZIRI_IDTOKEN);

  return async <T>(
    mutationString: TypedDocumentNode,
    variables: any,
    token?: string
  ) => {
    return await client.mutate<T>({
      mutation: mutationString,
      variables: variables,
      context: {
        headers: {
          Authorization: token || IdToken?.value,
        },
      },
    });
  };
};
