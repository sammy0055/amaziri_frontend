import { IconType } from "react-icons";
import styles from "./icon.module.scss";
interface IconProps {
  Icon: IconType;
}
export const IconWrapper: React.FC<IconProps> = ({ Icon }) => {
  return <Icon className={styles["Icon"]} />;
};
