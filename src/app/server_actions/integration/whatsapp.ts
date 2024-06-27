"use server";
import { metakeys } from "@/data/meta";
import { WhatsappManager } from "@/helpers/whatsapp/manage-whatsapp";
import { redirect } from "next/navigation";

const { whatSappLogin, inspectAcessToken } = new WhatsappManager();
export const metaWhatSappLogin = () => redirect(whatSappLogin());
export const inspectAcessTokenServer = () =>
  inspectAcessToken(metakeys.access_token);
