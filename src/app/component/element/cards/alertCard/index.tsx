"use client";
import styles from "./alertcard.module.scss";
import { MdError, MdClose } from "react-icons/md";
import { useAlertHandler } from "@/app/hooks/common/alert";

export const AlertErrorCard: React.FC = () => {
  const { errorMessage, isErrorActive, openAndCloseErrorCard } =
    useAlertHandler();
  return (
    <div
      className={`${styles["Container"]} ${
        !isErrorActive ? styles["ErrorCardActive"] : ""
      }`}
    >
      <div className={styles["Text-Wrappper"]}>
        <span>
          <MdError className={styles["MdError"]} />
        </span>
        <span className={styles["Text"]}>
         {errorMessage}
        </span>
        <button>
          <MdClose
            onClick={openAndCloseErrorCard}
            className={styles["MdClose"]}
          />
        </button>
      </div>
    </div>
  );
};
