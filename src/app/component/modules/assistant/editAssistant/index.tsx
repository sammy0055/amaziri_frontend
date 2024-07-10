"use client";
import {
  ButtonsContainer,
  ContentContainer,
  HeadingContent,
} from "@/app/component/element/assistant/editAssistant";
import styles from "./index.module.scss";
import { Divider } from "@mui/joy";
import { TextField } from "@/app/component/molecules/textField";
import { TextAreaField } from "@/app/component/molecules/TextAreaField";
import { KnowledgeBaseArea } from "@/app/component/element/knowledgebase_panel/edit";
import { useAssistant } from "@/app/hooks/assistant";

export const EditAssistantSettingsArea = () => {
  return (
    <div>
      <div className={styles["EditAssistantSettingsArea"]}>
        <HeadingContent name="Customer Support Assistant" />
        <ButtonsContainer />
      </div>
      <Divider />
    </div>
  );
};

export const EditAssistantContentArea = () => {
  const { assistantInputData, handleAssistantChange } = useAssistant();
  return (
    <div className={styles["EditAssistantContentArea"]}>
      <ContentContainer
        title="Basic"
        description="Give a public name and description to the
assistant, and control privacy settings."
      >
        <TextField
          label="name"
          name="name"
          type="text"
          value={assistantInputData?.name}
          handleChange={handleAssistantChange}
        />

        <TextAreaField
          label="description"
          name="description"
          type="text"
          value={assistantInputData?.description}
          handleChange={handleAssistantChange}
          customStyles={styles["TextAreaCustomStyle"]}
        />
      </ContentContainer>

      <ContentContainer
        title="Instructions"
        description="This is where you explain to the assistant
what it's goal is, and share any other
context you want it to always know."
      >
        <TextAreaField
          label="Instructions"
          name="instructions"
          type="text"
          value={assistantInputData?.instructions.join("") || ""}
          handleChange={handleAssistantChange}
          customStyles={styles["InstructionsCustomStyle"]}
        />
      </ContentContainer>

      {/* <ContentContainer
        title="Brand Voice"
        description="Teach your AI assistant to adapt to your
unique brand voice by providing examples
of your brand's writing."
      >
        <span>heloo</span>
      </ContentContainer> */}

      <ContentContainer
        title="Knowledge Vault"
        description="the assistant will search the Knowledge 
Base for your answer"
      >
        <div>
          <KnowledgeBaseArea />
        </div>
      </ContentContainer>
    </div>
  );
};
