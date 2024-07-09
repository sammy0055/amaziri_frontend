import { Button } from "@/app/component/atom/buttons";
import styles from "./index.module.scss";
import { HeadingSection } from "../create-assistant";
import { KnowledgeBaseArea } from "../../../knowledgebase_panel/edit";
import { useAssistant } from "@/app/hooks/assistant";
interface CreateAssistantStepProps {
  nextStep: () => void;
  prevStep: () => void;
}

export const CreateAssistantStep4: React.FC<CreateAssistantStepProps> = ({
  nextStep,
  prevStep,
}) => {
  const { isDisabled, submitCreateAssistantData } = useAssistant();
  const sendData = async () => {
    const success = await submitCreateAssistantData();
    if (success) nextStep();
  };
  return (
    <div className={styles["CreateAssistantStep4"]}>
      <HeadingSection
        title="Select knowledge base and upload document"
        description="Select which parts of the Knowledge Base you want the Assistant to automatically search through for answers.
        You must select at least one part of the Knowledge Base."
      />
      <div className={styles["CardContainer"]}>
        <KnowledgeBaseArea />
      </div>
      <div className={styles["BtnContainer"]}>
        <div className={styles["BtnWrapper"]}>
          <Button handler={prevStep}>previous</Button>
        </div>
        <div className={styles["BtnWrapper"]}>
          <Button handler={sendData} isDisabled={isDisabled}>
            next
          </Button>
        </div>
      </div>
    </div>
  );
};
