import { Heading3, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./card.module.scss";
import { IoMdMore } from "react-icons/io";
import { IoPersonCircleOutline, IoPerson } from "react-icons/io5";
import { IconAndLabel } from "@/app/component/molecules/IconAndText";
import { Divider } from "@mui/joy";
import { IconBtnWrapper } from "@/app/component/atom/buttons";

interface AssistantCardProps {
  _id: string;
  name: string;
  description: string;
}
export const AssistantCard: React.FC<AssistantCardProps> = ({
  _id,
  name,
  description,
}) => {
  return (
    <div className={styles["Card"]}>
      <div className={styles["IconTop"]}>
        <IoPersonCircleOutline size={30} />
        <IconBtnWrapper>
        <IoMdMore size={30} />
        </IconBtnWrapper>
       
      </div>
      <div className={styles["TextWrapper"]}>
        <Heading3 customStyles={styles["Heading"]}>{name}</Heading3>
        <IconAndLabel Icon={IoPerson} text="amaziri" />
      </div>
      <Divider />
      <LabelParagraph customStyles={styles["TextWrapper"]}>
        {description}
      </LabelParagraph>
    </div>
  );
};
