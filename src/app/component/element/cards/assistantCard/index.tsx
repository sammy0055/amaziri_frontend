import { Heading3, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./card.module.scss";
import { IoMdMore } from "react-icons/io";
import { IoPersonCircleOutline, IoPerson } from "react-icons/io5";
import { IconAndLabel } from "@/app/component/molecules/IconAndText";
import { Divider } from "@mui/joy";
import { Button, IconBtnWrapper } from "@/app/component/atom/buttons";
import { BasicPopover } from "../../popover";
import { useAssistant } from "@/app/hooks/assistant";
import { useRouter } from "next/navigation";

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
  const { push } = useRouter();
  const { handleSetAssistantEditData } = useAssistant();
  interface EditAssistantBtnProps {
    onClick: (event: any) => void;
  }
  const EditAssistantBtn: React.FC<EditAssistantBtnProps> = ({ onClick }) => {
    return (
      <IconBtnWrapper handler={onClick}>
        <IoMdMore size={30} />
      </IconBtnWrapper>
    );
  };

  const EditSettings = () => {
    const handleEdit = () => {
      handleSetAssistantEditData(_id);
      push("/home/edit_assistant");
    };
    return (
      <div>
        <div className={styles["PopupContent"]}>
          <Button handler={handleEdit}>edit</Button>
        </div>
        <div>
          <Button>delete</Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles["Card"]}>
      <div className={styles["IconTop"]}>
        <IoPersonCircleOutline size={30} />
        <div>
          <BasicPopover
            ButtonComponent={EditAssistantBtn}
            PopUpContent={<EditSettings />}
          />
        </div>
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
