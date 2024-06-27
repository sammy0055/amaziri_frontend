import { ChangeEvent } from "react";

export interface InputProps {
  value: string;
  name: string;
  type: "text" | "password";
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface TextFieldProps extends InputProps {
  label: string;
}
