"use client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp as initializeAppClient } from "firebase/app";

export const firebaseConfigClient = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

const clientApp = initializeAppClient(firebaseConfigClient);

export const firebaseAuthApp = getAuth(clientApp);

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseAuthApp, email, password);
};
