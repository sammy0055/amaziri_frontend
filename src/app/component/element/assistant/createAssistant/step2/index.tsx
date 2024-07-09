import { Button } from "@/app/component/atom/buttons";
import styles from "./index.module.scss";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { Divider } from "@mui/joy";
import { TextField } from "@/app/component/molecules/textField";
import { useAssistant } from "@/app/hooks/assistant";

interface CreateAssistantStepProps {
  nextStep: () => void;
  prevStep: () => void;
}

export const CreateAssistantStep2: React.FC<CreateAssistantStepProps> = ({
  prevStep,
  nextStep,
}) => {
  const { assistantInputData, handleAssistantChange, validateRequiredFields } =
    useAssistant();

  const handleNext = () => {
    const isValid = validateRequiredFields();
    if (isValid) nextStep();
  };
  return (
    <div className={styles["CreateAssistantStep2"]}>
      <div>
        <Heading customStyles={styles["Haeding"]}>
        Customize the Assistant
        </Heading>
        <LabelParagraph>
         
            Instructions are how you explain to the assistant what it's goal is,
            and share any other context you want it to always know. These
            instructions have been auto-generated based on the information you
            provided. You can always edit this later.
          
        </LabelParagraph>
      </div>
      <div className={styles["Divider"]}>
        <Divider />
      </div>

      <div className={styles["InputContainer"]}>
        <TextField
          label="Assistant Name"
          type="text"
          name="name"
          value={assistantInputData.name || ""}
          handleChange={handleAssistantChange}
        />
        <TextField
          label="Assistant Description"
          type="text"
          name="description"
          value={assistantInputData.description || ""}
          handleChange={handleAssistantChange}
        />
        <div className={styles["InputContainer"]}>
          <label>Assistant Instructions</label>
          <textarea
            className={styles["TextArea"]}
            name="instructions"
            value={assistantInputData?.instructions.join("") || ""}
            onChange={handleAssistantChange}
          />
        </div>
      </div>
      <div className={styles["BtnContainer"]}>
        <div className={styles["BtnWrapper"]}>
          <Button handler={prevStep}>previous</Button>
        </div>
        <div className={styles["BtnWrapper"]}>
          <Button handler={handleNext}>next</Button>
        </div>
      </div>
    </div>
  );
};
