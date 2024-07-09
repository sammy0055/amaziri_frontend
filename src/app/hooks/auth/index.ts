import { addAuthCookies, signUp } from "@/app/server_actions/auth";
import { ChangeEvent, useState } from "react";
import { useErrorHandler } from "../common/error";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/helpers/firebase";
import { appEnums } from "@/types/common";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { handleError } = useErrorHandler();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get(appEnums.CONTINUEURL);
  const signUpHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      await signUp({ email, password });
      setIsDisabled(false);
      replace(redirectUrl || "/home");
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  const loginHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const res = await login(email, password);
      const tokenData = await res.user.getIdTokenResult();

      addAuthCookies({ idToken: tokenData.token, exp: tokenData.claims.exp! });
      setIsDisabled(false);
      replace(redirectUrl || "/home");
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  return {
    email,
    password,
    isDisabled,
    setEmail,
    setPassword,
    signUpHandler,
    loginHandler,
  };
};
