"use client";

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface RecoilRootProps {
  children: ReactNode;
}
export const RecoilRootProvider: React.FC<RecoilRootProps> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
