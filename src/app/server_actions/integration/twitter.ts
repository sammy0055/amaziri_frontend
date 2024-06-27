"use server";
import { XLogin } from "@/helpers/twitter";
import { getEnv } from "@/utils/getEnv";
import { TwitterApi } from "twitter-api-v2";

// Replace with your actual API Keys and Access Token
const userCredentials = {
  token_type: "bearer",
  expires_in: 7200,
  access_token:
    "akhaV0VHY3ZxSU9zbXNXN3cxUU5BaGl0ZTRMMWItb0cyZWdUd0dGNmw5MUZDOjE3MTY1MDg2ODQyNjg6MTowOmF0OjE",
  scope: "users.read tweet.read offline.access",
  refresh_token:
    "SzRnRTJBX0hhQ3BYTEgwS1J0bVJWWGctYkxpRFJrdUNWa3ZuWkxuV3dzb3lxOjE3MTY1MDg2ODQyNjg6MToxOnJ0OjE",
};

export async function getDmEvents() {
  try {
    const client = new TwitterApi({
      appKey: getEnv("X_API_KEY"),
      appSecret: getEnv("X_API_SECRET"),
      accessToken: userCredentials.access_token,
    });

    // Get DM events for the authenticated user
    const dmEvents = await client.v2.tweet({text:"checking if api works"});

    console.log("DM Events:", dmEvents);
  } catch (error) {
    console.error("Error:", error);
  }
}

export const loginToX = () => XLogin();
