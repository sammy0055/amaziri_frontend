"use client";
import { ThemeProvider } from "next-themes";

interface ThemeProviderProps {
  children: any;
}
export const ThemesProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};


