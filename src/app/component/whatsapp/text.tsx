"use client";
import { WhatsappManager } from "@/helpers/whatsapp/manage-whatsapp";
import {
  loginToX,
  getDmEvents,
} from "../../server_actions/integration/twitter";
import { metakeys } from "@/data/meta";
import { inspectAcessTokenServer } from "../../server_actions/integration/whatsapp";

export const XLoginTest = () => {
  const { getMetaAccounts } = new WhatsappManager();
  const handleLogin = async () => {
    loginToX();
  };

  const handleMetaAccounts = async () => {
    try {
      const data = await getMetaAccounts(metakeys.access_token);
      console.log("====================================");
      console.log("data", data);
      console.log("====================================");
    } catch (error: any) {
      console.log("====================================");
      console.log("error", error);
      console.log("====================================");
    }
  };
  return (
    <>
      <button onClick={handleMetaAccounts}>test ddddd</button>
      <button onClick={handleLogin}>login to x</button>
    </>
  );
};
