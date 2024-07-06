import { IconType } from "react-icons";
import { IconWrapper } from "../../atom/icons";
import { IconLabel } from "../../atom/typography";
import styles from "./iconandtext.module.scss"

interface LabelProps {
    text: string;
    Icon: IconType;
    customStyles?:any
  }
  export const IconAndLabel: React.FC<LabelProps> = ({ text, customStyles, Icon }) => {
    return (
      <button className={`${styles["Container"]} ${customStyles}`}>
        <IconWrapper Icon={Icon} />
        <IconLabel text={text} />
      </button>
    );
  };