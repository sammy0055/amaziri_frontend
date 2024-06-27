"use client";

import { metaWhatSappLogin } from "../../server_actions/integration/whatsapp";

export const WhatSappLoginButton = () => {
  const handleLogin = () => {
    metaWhatSappLogin();
  };
  return <button onClick={handleLogin}>login to whatsapp</button>;
};
