import { Button } from "@/app/component/atom/buttons";
import styles from "./index.module.scss";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useAssistant } from "@/app/hooks/assistant";
import { Divider } from "@mui/joy";
interface CreateAssistantStepProps {
  nextStep: () => void;
  prevStep: () => void;
}

export const CreateAssistantStep3: React.FC<CreateAssistantStepProps> = ({
  nextStep,
  prevStep,
}) => {
  const { assistantInputData, selectAssistantType } = useAssistant();
  return (
    <div className={styles["CreateAssistantStep3"]}>
      <div>
        <Heading customStyles={styles["Haeding"]}>
          Is this a Question & Answer Assistant?
        </Heading>
        <LabelParagraph>
          A Q&A assistant is designed for information retrieval, as it
          automatically searches the knowledge base with every request. Decide
          whether to activate this functionality for your AI assistant.
        </LabelParagraph>
      </div>
      <div className={styles["Divider"]}>
        <Divider />
      </div>
      <div className={styles["CardContainer"]}>
        <AssistantTypeCard
          title="Off (default)"
          description={`The chat will not search the knowledge base for every input. You can
          still reference the knowledge base using "#" within a chat.`}
          useCase1="Marketing assistants generating high-level content"
          useCase2="Sales assistants crafting sales emails"
          type="NONE"
          selectedType={assistantInputData.type}
          onSelect={selectAssistantType}
        />
        <AssistantTypeCard
          title="On"
          description={`The chat will look for answers in the knowledge base every time a request is made.`}
          useCase1="Customer service assistants handling inquiries"
          useCase2="Onboarding Assistant that answers company questions"
          type="Q&A"
          selectedType={assistantInputData.type}
          onSelect={selectAssistantType}
        />
      </div>
      <div className={styles["BtnContainer"]}>
        <div className={styles["BtnWrapper"]}>
          <Button handler={prevStep}>previous</Button>
        </div>
        <div className={styles["BtnWrapper"]}>
          <Button handler={nextStep}>next</Button>
        </div>
      </div>
    </div>
  );
};

interface AssistantTypeCardProps {
  title: string;
  description: string;
  useCase1: string;
  useCase2: string;
  type: "NONE" | "Q&A";
  selectedType: "NONE" | "Q&A";
  onSelect: (type: "NONE" | "Q&A") => void;
}
const AssistantTypeCard: React.FC<AssistantTypeCardProps> = ({
  title,
  description,
  useCase1,
  useCase2,
  type,
  selectedType,
  onSelect,
}) => {
  const selected = type === selectedType;
  return (
    <div
      onClick={() => onSelect(type)}
      className={` ${
        selected ? styles["Selected"] : styles["AssistantTypeContainer"]
      }`}
    >
      <div className={styles["HeadWrapper"]}>
        <Heading customStyles={styles["Haeding"]}>{title}</Heading>
        {selected && <IoIosCheckmarkCircle size={20} color="blue" />}
      </div>
      <div>
        <LabelParagraph>{description}</LabelParagraph>

        <LabelParagraph>
          <span>Best suited for:</span>
          <ul className={styles["List"]}>
            <li>{useCase1}</li>
            <li>{useCase2}</li>
          </ul>
        </LabelParagraph>
      </div>
    </div>
  );
};
