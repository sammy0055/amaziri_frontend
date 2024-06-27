import { ReactNode } from "react";
import styles from "./headings.module.scss";
export const ProjectNameHeading = () => {
  return <span className={styles["ProjectName"]}>Omaziri</span>;
};

interface SmallHeadingProps {
  children: ReactNode;
}
export const Heading3: React.FC<SmallHeadingProps> = ({ children }) => {
  return <h3 className={styles["Heading3"]}>{children}</h3>;
};

export const LabelParagraph: React.FC<SmallHeadingProps> = ({ children }) => {
  return <p className={styles["LabelParagraph"]}>{children}</p>;
};
