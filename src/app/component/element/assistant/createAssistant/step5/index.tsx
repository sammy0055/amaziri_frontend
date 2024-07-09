"use client";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./index.module.scss";

export const CreateAssistantStep5 = () => {
  return (
    <div className={styles["CreateAssistantStep5"]}>
      <div>
        <Heading customStyles={styles["Haeding"]}>title</Heading>
        <LabelParagraph>description</LabelParagraph>
      </div>
    </div>
  );
};
