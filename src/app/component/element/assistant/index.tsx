"use client";
import styles from "./index.module.scss";
import { Button } from "../../atom/buttons";
import { BackBtn } from "../../atom/buttons/backBtn";
import { Heading, LabelParagraph } from "../../atom/headings";

import { IoIosAddCircle } from "react-icons/io";
import { Divider } from "@mui/joy";
import { AssistantCard } from "../cards/assistantCard";
import { useAssistant } from "@/app/hooks/assistant";
import { useAssistantState } from "@/app/state-management/assistant";
import { Assistant } from "@/types/assistant";
import { useEffect } from "react";

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

interface AssistantAreaProps {
  data: Assistant[];
}
export const AssistantArea: React.FC<AssistantAreaProps> = ({ data }) => {
  const [assistantData, setAssistantData] = useAssistantState();

  useEffect(() => {
    setAssistantData(data);
  }, [data]);

  return (
    <div className={styles["AssistantArea"]}>
      {assistantData?.map((assistant) => {
        return (
          <AssistantCard
            key={assistant?._id}
            name={assistant?.name}
            description={assistant?.description}
            _id={assistant?._id}
          />
        );
      })}
    </div>
  );
};
