import Image from "next/image";
import styles from "./button.module.scss";
import { Button as Btn } from "@mui/joy";
import { ReactNode } from "react";

interface ButtonProps {
  children: React.ReactNode;
  handler?: () => void;
  type?: "button" | "submit";
  isDisabled?: boolean;
  variant?: "solid" | "soft" | "outlined" | "plain";
}
export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  isDisabled = false,
  variant,
  handler,
}) => {
  return (
    <Btn
      className={styles["Button"]}
      onClick={handler}
      type={type}
      disabled={isDisabled}
      loading={isDisabled}
      variant={variant}
    >
      {children}
    </Btn>
  );
};

export const SignUpWithGoogleBtn: React.FC<ButtonProps> = ({
  children,
  handler,
}) => {
  return (
    <button className={styles["GoogleBtn"]} onClick={handler}>
      <Image
        className={styles["GoogleBtnImg"]}
        src={"./assets/google_logo.svg"}
        width={30}
        height={30}
        alt="google logo"
      />
      <span>{children}</span>
    </button>
  );
};

interface IconBtnWrapperProps {
  children: ReactNode;
  handler?: (e?:any) => void;
}
export const IconBtnWrapper: React.FC<IconBtnWrapperProps> = ({
  children,
  handler,
}) => {
  return (
    <button className={styles["BackgroundlessBtn"]} onClick={handler}>
      {children}
    </button>
  );
};
