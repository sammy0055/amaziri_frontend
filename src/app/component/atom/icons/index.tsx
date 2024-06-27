import styles from "./icon.module.scss";
interface IconProps {
  icon: React.ReactNode;
}
export const IconWrapper: React.FC<IconProps> = ({ icon }) => {
  return <span className={styles["Icon"]}>{icon}</span>;
};
