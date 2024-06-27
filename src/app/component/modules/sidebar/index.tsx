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
        <IconAndLabel text="All Chats" icon={<IoChatbubbles />} />
        <IconAndLabel text="Assistants" icon={<FcAssistant />} />
      </SidebarItem>

      <SidebarItem label="Automation">
        <IconAndLabel text="Workfows" icon={<LuWorkflow />} />
        <IconAndLabel text="Templates" icon={<LuLayoutTemplate />} />
      </SidebarItem>

      <SidebarItem label="Business Context">
        <Link href={"/home/knowledge_base"}>
          <IconAndLabel text="Knowledge Base" icon={<IoFolderOpen />} />
        </Link>
      </SidebarItem>

      <div className={styles["Others"]}>
        <IconAndLabel text="Upgrade" icon={<GrUpgrade />} />
        <IconAndLabel text="Whats New" icon={<MdNotificationsActive />} />
        <IconAndLabel text="Help" icon={<MdHelp />} />
        <IconAndLabel text="Profile" icon={<BsPersonFillCheck />} />
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
