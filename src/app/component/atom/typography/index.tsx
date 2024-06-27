import styles from "./typography.module.scss";

interface LabelProps {
  text: string;
}
export const IconLabel: React.FC<LabelProps> = ({ text }) => {
  return <span className={styles["SMlabel"]}>{text}</span>;
};
