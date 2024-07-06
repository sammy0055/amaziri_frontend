import { Heading3, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./card.module.scss";
import { IoMdMore } from "react-icons/io";
import { IoPersonCircleOutline, IoPerson } from "react-icons/io5";
import { IconAndLabel } from "@/app/component/molecules/IconAndText";
import { Divider } from "@mui/joy";

export const AssistantCard = () => {
  return (
    <div className={styles["Card"]}>
      <div className={styles["IconTop"]}>
        <IoPersonCircleOutline size={30} />
        <IoMdMore size={30} />
      </div>
      <div className={styles["TextWrapper"]}>
        <Heading3 customStyles={styles["Heading"]}>sales assistant</Heading3>
        <IconAndLabel Icon={IoPerson} text="amaziri" />
      </div>
      <Divider />
      <LabelParagraph customStyles={styles["TextWrapper"]}>
        assistant for sales purposes and for marketting campaign
      </LabelParagraph>
    </div>
  );
};
