import { IoFolderOpen } from "react-icons/io5";
import { Button } from "../../atom/buttons";
import { IconLabel } from "../../atom/typography";
import {
  KnowledgeBasePanel,
  SelecteKnowledgeBaseDisplay,
} from "../../element/knowledgebase_panel";
import { IconAndLabel } from "../../molecules/IconAndText";
import styles from "./index.module.scss";
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
      <IconLabel text="All Files" />
      <SelecteKnowledgeBaseDisplay />
    </div>
  );
};
