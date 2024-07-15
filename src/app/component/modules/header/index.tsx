"use client";
import { useSidbarState } from "@/app/state-management/utility-state";
import styles from "./header.module.scss";
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
export const Header = () => {
  const [openSidebar, setOpenSidebar] = useSidbarState();

  const toggleSidebar = () => setOpenSidebar(!openSidebar);
  return (
    <header className={styles["Header"]}>
      {openSidebar ? (
        <LuPanelLeftOpen onClick={toggleSidebar} className={styles["Icon"]} />
      ) : (
        <LuPanelRightOpen onClick={toggleSidebar} className={styles["Icon"]} />
      )}
      <div className={styles["Content"]}>
        <span>hello world</span>
      </div>
    </header>
  );
};
