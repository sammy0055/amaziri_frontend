import { IconLabel } from "@/app/component/atom/typography";
import styles from "./index.module.scss";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { BackBtn } from "@/app/component/atom/buttons/backBtn";
import { Button } from "@/app/component/atom/buttons";
import { IoOpenOutline } from "react-icons/io5";
import { ReactNode } from "react";
import { useAssistant } from "@/app/hooks/assistant";
import { useRouter } from "next/navigation";

interface HeadingContentProps {
  name: string;
}
export const HeadingContent: React.FC<HeadingContentProps> = ({ name }) => {
  return (
    <div className={styles["HeadingContent"]}>
      <BackBtn />
      <div>
        <IconLabel text="Assistant Settings" />
        <Heading>{name}</Heading>
      </div>
    </div>
  );
};

export const ButtonsContainer = () => {
  const { isDisabled, submitEditAssistantData } = useAssistant();
  const { push } = useRouter();
  const handleSubmit = async () => {
    const sucess = await submitEditAssistantData();
    if(sucess) push("/home/assistant");
  };
  return (
    <div className={styles["ButtonsContainer"]}>
      <div className={styles["Btn1"]}>
        <Button>
          <span className={styles["BtnContent"]}>
            <span>open in chat</span>
            <IoOpenOutline size={20} />
          </span>
        </Button>
      </div>
      <div className={styles["Btn2"]}>
        <Button isDisabled={isDisabled} handler={handleSubmit}>save</Button>
      </div>
    </div>
  );
};

interface ContentContainerProps {
  title: string;
  description: string;
  children: ReactNode;
}
export const ContentContainer: React.FC<ContentContainerProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className={styles["ContentContainer"]}>
      <div className={styles["TextArea"]}>
        <div className={styles["TextWrapper"]}>
          <Heading>{title}</Heading>
          <LabelParagraph>{description}</LabelParagraph>
        </div>
      </div>
      <div className={styles["EditContentArea"]}>{children}</div>
    </div>
  );
};
