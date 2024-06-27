"use server";
import { client } from "@/app/graphql";
import { loginSchema, signupSchema } from "@/app/graphql/mutation";
import { AuthInput } from "@/types/auth";
import { LocalStorageVariables } from "@/types/common";
import { cookies } from "next/headers";

interface AuthPayload {
  code: string;
  success: boolean;
  message: string;

  data: {
    IdToken: string;
    email: string;
    exp: number;
  };
}

export const signUp = async (data: AuthInput) => {
  const payload = (await client.mutate({
    mutation: signupSchema,
    variables: { inputData: data },
  })) as {
    data: {
      signUp: AuthPayload;
    };
  };

  if (!payload.data.signUp.success) throw new Error("something went wrong");
  setCookie(
    LocalStorageVariables.AMAZIRI_IDTOKEN,
    payload.data.signUp.data.IdToken
  );
  return payload;
};

export const login = async (data: AuthInput) => {
  const payload = (await client.mutate({
    mutation: loginSchema,
    variables: { loginDetails: data },
  })) as {
    data: {
      emailAndPasswordLogin: AuthPayload;
    };
  };

  if (!payload.data.emailAndPasswordLogin.success)
    throw new Error("something went wrong");
  setCookie(
    LocalStorageVariables.AMAZIRI_IDTOKEN,
    payload.data.emailAndPasswordLogin.data.IdToken
  );
  return payload;
};

export const setCookie = async (key: string, value: string) => {
  const cookie = cookies();
  cookie.set(key, value, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
};
