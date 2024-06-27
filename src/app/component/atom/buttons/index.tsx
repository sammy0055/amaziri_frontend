import Image from "next/image";
import styles from "./button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  handler?: () => void;
  type?: "button" | "submit";
  isDisabled?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  isDisabled = false,
  handler,
}) => {
  return (
    <button
      className={`${styles["BtnWrapper"]} ${
        isDisabled ? styles["Btn-disabled"] : ""
      }`}
      onClick={handler}
      type={type}
      disabled={isDisabled}
    >
      {children}
    </button>
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
