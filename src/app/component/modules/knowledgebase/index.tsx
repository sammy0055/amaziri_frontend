"use client";
import { Button } from "../../atom/buttons";
import { IconLabel } from "../../atom/typography";
import { SelecteKnowledgeBaseDisplay } from "../../element/knowledgebase_panel";
import styles from "./index.module.scss";
import { BackBtn } from "../../atom/buttons/backBtn";
import { DocumentArea } from "../../element/knowledgebase_panel/document";
import { useRef } from "react";
import { useKnowledgeBase } from "@/app/hooks/knowledgebase";

export const KnowledgeBaseArea = () => {
  const { handleFileChange, isDisabled } = useKnowledgeBase();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles["KnowledgeBaseArea"]}>
      <div className={styles["SettingsArea"]}>
        <div className={styles["All-Files-wrapper"]}>
          <BackBtn />
          <div>
            <IconLabel text="All Files" />
            <SelecteKnowledgeBaseDisplay />
          </div>
        </div>
        <div className={styles["Btn-container"]}>
          <Button handler={handleClick} isDisabled={isDisabled}>
            <span>add Document</span>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Button>
        </div>
      </div>

      <div className={styles["DocumentArea"]}>
        <DocumentArea />
      </div>
    </div>
  );
};
