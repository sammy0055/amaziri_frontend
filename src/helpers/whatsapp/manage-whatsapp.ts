import { getEnv } from "@/utils/getEnv";
import queryString from "query-string";

const AppId = getEnv("META_APP_ID");
const AppSecret = getEnv("META_APP_SECRET");
export class WhatsappManager {
  whatSappLogin = (redirectUrl = "http://localhost:3000/") => {
    const configId = getEnv("META_APP_WHATSAPP_AUTH_CONFIG");
    const accessScope = [
      "whatsapp_business_management",
      "whatsapp_business_messaging",
      "business_management",
    ];
    const urlParams = queryString.stringify({
      client_id: AppId,
      config_id: configId,
      // scope: accessScope,
      response_type: "code",
      override_default_response_type: true,
      redirect_uri: redirectUrl,
    });

    return `https://www.facebook.com/v18.0/dialog/oauth?${urlParams}`;
  };

  getMetaUserAuthData = async (
    loginCode: string,
    redirect_uri = "http://localhost:3000/"
  ) => {
    const params = {
      client_id: AppId,
      client_secret: AppSecret,
      redirect_uri: redirect_uri,
      code: loginCode,
    };
    const encoded = new URLSearchParams(params);
    const url = `https://graph.facebook.com/v18.0/oauth/access_token?${encoded.toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw data.error;
    return data;
  };

  getMetaAccounts = async (accessToken: string) => {
    const url = `https://graph.facebook.com/v20.0/326758163855062`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }

    const data = await res.json();
    return data;
  };

  inspectAcessToken = async (accessToken: string) => {
    const stringifiedParams = queryString.stringify({
      input_token: accessToken,
      access_token: `${AppId}|${AppSecret}`,
    });

    const params = new URLSearchParams({
      input_token: accessToken,
      access_token: `${AppId}|${AppSecret}`,
    });

    const url = `https://graph.facebook.com/debug_token?${stringifiedParams}`;
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.error.message}`);
    }

    const data = await res.json();
    return data;
  };
}
