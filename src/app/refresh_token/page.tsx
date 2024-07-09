"use client";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuthApp } from "@/helpers/firebase";
import { useEffect } from "react";
import { addAuthCookies } from "../server_actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { appEnums } from "@/types/common";

export default function RefreshToken() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const redirectUrl = searchParams.get(appEnums.CONTINUEURL);
    onAuthStateChanged(firebaseAuthApp, async (user) => {
      if (user) {
        const tokenData = await user.getIdTokenResult();
        addAuthCookies({
          idToken: tokenData.token,
          exp: tokenData.claims.exp!,
        });

        replace(redirectUrl || "/home");
        // ...
      } else {
        // User is signed out
        replace("/login");
      }
    });
  }, []);
  return <></>;
}
