import styles from "./sidebar.module.scss";
import { ReactNode } from "react";
import { ProjectNameAndLogo } from "../../molecules/projectName";
import { FcAssistant } from "react-icons/fc";
import { LuWorkflow, LuLayoutTemplate } from "react-icons/lu";
import { IoFolderOpen } from "react-icons/io5";
import { GrUpgrade } from "react-icons/gr";
import { MdNotificationsActive, MdHelp } from "react-icons/md";
import { BsPersonFillCheck } from "react-icons/bs";

import { IoChatbubbles } from "react-icons/io5";
import { IconAndLabel } from "../../molecules/IconAndText";
import { ToggleTheme } from "@/app/theme/theme-control";
import Link from "next/link";
export const Sidebar = () => {
  return (
    <section className={styles["Sidebar-Wrapper"]}>
      <ProjectNameAndLogo />
      <SidebarItem label="ai assistants">
        <IconAndLabel
          text="All Chats"
          Icon={IoChatbubbles}
          customStyles={styles["IconAndLabelCustomStyle"]}
        />
        <Link href={"/home/assistant"}>
          <IconAndLabel
            text="Assistants"
            Icon={FcAssistant}
            customStyles={styles["IconAndLabelCustomStyle"]}
          />
        </Link>
      </SidebarItem>

      <SidebarItem label="Automation">
        <IconAndLabel
          text="Workfows"
          Icon={LuWorkflow}
          customStyles={styles["IconAndLabelCustomStyle"]}
        />
        <IconAndLabel
          text="Templates"
          Icon={LuLayoutTemplate}
          customStyles={styles["IconAndLabelCustomStyle"]}
        />
      </SidebarItem>

      <SidebarItem label="Business Context">
        <Link href={"/home/knowledge_base"}>
          <IconAndLabel
            text="Knowledge Base"
            Icon={IoFolderOpen}
            customStyles={styles["IconAndLabelCustomStyle"]}
          />
        </Link>
      </SidebarItem>

      <div className={styles["Others"]}>
        <IconAndLabel
          text="Upgrade"
          Icon={GrUpgrade}
          customStyles={styles["IconAndLabelCustomStyle"]}
        />
        <IconAndLabel
          text="Whats New"
          Icon={MdNotificationsActive}
          customStyles={styles["IconAndLabelCustomStyle"]}
        />
        <IconAndLabel
          text="Help"
          Icon={MdHelp}
          customStyles={styles["IconAndLabelCustomStyle"]}
        />
        <IconAndLabel
          text="Profile"
          Icon={BsPersonFillCheck}
          customStyles={styles["IconAndLabelCustomStyle"]}
        />
        <ToggleTheme />
      </div>
    </section>
  );
};

interface SidebarItemProps {
  label: string;
  children: ReactNode;
}
export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  children,
}) => {
  return (
    <div className={styles["SidebarItem"]}>
      <span className={styles["SidebarItem-label"]}>{label}</span>
      <div>{children}</div>
    </div>
  );
};
