import { Button } from "../../atom/buttons";
import { IconLabel } from "../../atom/typography";
import {
  KnowledgeBasePanel,
  SelecteKnowledgeBaseDisplay,
} from "../../element/knowledgebase_panel";
import styles from "./index.module.scss";
import { BackBtn } from "../../atom/buttons/backBtn";
export const KnowledgeBaseSettings = () => {
  return (
    <div className={styles["BaseContainer"]}>
      <Button>new</Button>
      <KnowledgeBasePanel />
    </div>
  );
};

export const KnowledgeBaseArea = () => {
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
          <Button>
            <span>add Document</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
