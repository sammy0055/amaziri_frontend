import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { IconType } from "react-icons";
import { AiOutlineCodepenCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import styles from "./index.module.scss";

interface CreateAssistantStep1Props {
  handler: () => void;
}
export const CreateAssistantStep1:React.FC<CreateAssistantStep1Props> = ({handler}) => {
  return (
    <div className={styles["CreateAssistantStep1"]} onClick={handler}>
      <div>
        <Heading customStyles={styles["Haeding"]}>
          Create A New Assistant
        </Heading>
        <LabelParagraph>
          Choose your preferred method for creating an AI Assistant
        </LabelParagraph>
      </div>

      <div className={styles["BoxArea"]}>
        <Box
          Icon={FaPlus}
          title="Custom Setup"
          text="Create you AI Assistance with guided customization for your unique
          goals."
        />
        <Box
          customStyles={styles["CommingSoon"]}
          Icon={AiOutlineCodepenCircle}
          title="Use a Starting Point"
          text="Begin with pre-made starting point, then customize from there."
        />
      </div>
    </div>
  );
};

interface BoxProps {
  Icon: IconType;
  title: string;
  text: string;
  customStyles?: any;
}
export const Box: React.FC<BoxProps> = ({
  Icon,
  text,
  title,
  customStyles,
}) => {
  return (
    <div className={`${styles["Box"]} ${customStyles}`}>
      <Icon size={40} color="blue" />
      <Heading customStyles={styles["Haeding"]}>{title}</Heading>
      <LabelParagraph>{text}</LabelParagraph>
    </div>
  );
};
