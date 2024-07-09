import { firebaseAuthApp } from "@/helpers/firebase";
import { addAuthCookies, getAuthDataFromCookies } from "../server_actions/auth";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { appEnums } from "@/types/common";

export const useGqlApiCall = () => {
  const { push } = useRouter();
  const path = usePathname();
  const user = firebaseAuthApp.currentUser;

  return async <T>(callBackFn: (token: string) => T): Promise<T | void> => {
    if (!user) {
      return push(`/login?${appEnums.CONTINUEURL}=${path}`);
    }

    const { exp } = getAuthDataFromCookies();
    const expiresIn = parseInt(exp?.value!) * 1000 - Date.now();
    if (expiresIn < 5 * 60 * 1000) {
      const tokenData = await user?.getIdTokenResult()!;
      addAuthCookies({
        idToken: tokenData.token,
        exp: tokenData.claims.exp!,
      });

      return callBackFn(tokenData.token);
    } else {
      return callBackFn("");
    }
  };
};
