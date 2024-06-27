import { login, signUp } from "@/app/server_actions/auth";
import { ChangeEvent, useState } from "react";
import { useErrorHandler } from "../common/error";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { handleError } = useErrorHandler();
  const { push } = useRouter();

  const signUpHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      await signUp({ email, password });
      setIsDisabled(false);
      push("/home");
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  const loginHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
       await login({ email, password });
      setIsDisabled(false);
      push("/home");
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
