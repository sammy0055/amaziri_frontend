import { Button } from "@/app/component/atom/buttons";
import styles from "./index.module.scss";
interface CreateAssistantStepProps {
  nextStep: () => void;
  prevStep: () => void;
}

export const CreateAssistantStep4: React.FC<CreateAssistantStepProps> = ({
  nextStep,
  prevStep,
}) => {
  return (
    <div>
      <div>welcome to step 4</div>
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
