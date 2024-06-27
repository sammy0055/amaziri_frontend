import { getEnv } from "@/utils/getEnv";
import { redirect } from "next/navigation";
import { Client, auth } from "twitter-api-sdk";

import crypto from "crypto";

const userCredentials = {
  token_type: "bearer",
  expires_in: 7200,
  access_token:
    "bmh6Y09WVjlRT2NvamozWDZwSlBRZjJVTTdHMjV1d0VHbVZwX1VEVm1QOWVHOjE3MTY0OTgwMDgwMDI6MTowOmF0OjE",
  scope: "users.read tweet.read offline.access",
  refresh_token:
    "aDhma0dwVEZMMDJCaUV2MXl1RjlOOEpEMnhqWWhpRlp5aXRlTUJzZU1kQlNtOjE3MTY0OTgwMDgwMDI6MToxOnJ0OjE",
};

// Generate a random string for code_verifier
export const generateCodeVerifier = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Generate a code challenge from the code_verifier
export const generateCodeChallenge = (codeVerifier: string) => {
  return crypto.createHash("sha256").update(codeVerifier).digest("base64url");
};

const authClient = new auth.OAuth2User({
  client_id: getEnv("CLIENT_ID"),
  client_secret: getEnv("CLIENT_SECRET"),
  callback: "http://localhost:3000",
  scopes: ["tweet.read", "users.read", "offline.access"],
});

const STATE = "my-state";
const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenge(codeVerifier);
let savedCodeVerifier: string = "fKX4n5_I1_Kk7CC0xwNDwpo8ctLocV_68v0Z8ll3qYg";
const client = new Client(authClient);
export const XLogin = () => {
  const authUrl = authClient.generateAuthURL({
    code_challenge_method: "plain",
    code_challenge: savedCodeVerifier,
    state: STATE,
  });

  return redirect(authUrl);
};

export const _getUserCredentials = async (code: string) => {
  // Retrieve the code_verifier that was saved
  if (!savedCodeVerifier) {
    throw new Error("Code verifier not found.");
  }

  // Construct parameters for the token request
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000", // Ensure this matches the redirect URI used during authorization
    code_verifier: savedCodeVerifier,
  });

  // Make the request to get the access token
  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response:", errorResponse);
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  const tokenData = await response.json();
  return tokenData;
};
