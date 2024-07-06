import { ReactNode } from "react";
import styles from "./headings.module.scss";
export const ProjectNameHeading = () => {
  return <span className={styles["ProjectName"]}>Omaziri</span>;
};

interface SmallHeadingProps {
  children: ReactNode;
  customStyles?: any;
}

export const Heading: React.FC<SmallHeadingProps> = ({
  children,
  customStyles,
}) => {
  return <h1 className={`${customStyles}`}>{children}</h1>;
};
export const Heading3: React.FC<SmallHeadingProps> = ({ children, customStyles }) => {
  return <h3 className={`${styles["Heading3"]} ${customStyles}`}>{children}</h3>;
};

export const LabelParagraph: React.FC<SmallHeadingProps> = ({
  children,
  customStyles,
}) => {
  return (
    <p className={`${styles["LabelParagraph"]} ${customStyles}`}>{children}</p>
  );
};
