import { ProjectNameHeading } from "../../atom/headings";
import styles from "./projectname.module.scss";
export const ProjectNameAndLogo = () => {
  return (
    <div className={styles["Container"]}>
      <ProjectNameHeading />
    </div>
  );
};
