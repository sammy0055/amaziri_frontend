import { IconWrapper } from "../../atom/icons";
import { IconLabel } from "../../atom/typography";
import styles from "./iconandtext.module.scss"

interface LabelProps {
    text: string;
    icon: React.ReactNode;
  }
  export const IconAndLabel: React.FC<LabelProps> = ({ text, icon }) => {
    return (
      <button className={styles["Container"]}>
        <IconWrapper icon={icon} />
        <IconLabel text={text} />
      </button>
    );
  };