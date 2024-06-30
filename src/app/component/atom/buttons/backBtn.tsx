"use client";
import styles from "./button.module.scss"
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export const BackBtn = () => {
  const { back } = useRouter();
  return (
    <button className={styles["BackgroundlessBtn"]}>
      <IoArrowBackOutline onClick={() => back()} size={20} />
    </button>
  );
};
