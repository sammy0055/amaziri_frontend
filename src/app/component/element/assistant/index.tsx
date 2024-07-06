"use client";
import styles from "./index.module.scss";
import { Button } from "../../atom/buttons";
import { BackBtn } from "../../atom/buttons/backBtn";
import { Heading, LabelParagraph } from "../../atom/headings";

import { IoIosAddCircle } from "react-icons/io";
import { Divider } from "@mui/joy";
import { AssistantCard } from "../cards/assistantCard";
import { useAssistant } from "@/app/hooks/assistant";

export const SettingsArea = () => {
  const { startCreateAssistantProcess } = useAssistant();
  return (
    <>
      <div className={styles["SettingsArea"]}>
        <div className={styles["Section1"]}>
          <BackBtn />
          <div>
            <Heading>Assistants</Heading>
            <LabelParagraph customStyles={styles["Haeding"]}>
              Create and Manage your AI - powered assistants.
            </LabelParagraph>
          </div>
        </div>

        <div className={styles["Section2"]}>
          <Button handler={startCreateAssistantProcess}>
            <div className={styles["AddBtn"]}>
              <IoIosAddCircle size={20} />
              <span>add assistant</span>
            </div>
          </Button>
        </div>
      </div>
      <Divider />
    </>
  );
};

export const AssistantArea = () => {
  return (
    <div className={styles["AssistantArea"]}>
      <AssistantCard />
      <AssistantCard />
    </div>
  );
};
