import { Button } from "../../atom/buttons";
import { IconLabel } from "../../atom/typography";
import {
  AddFolder,
  KnowledgeBasePanel,
  SelecteKnowledgeBaseDisplay,
} from "../../element/knowledgebase_panel";
import styles from "./index.module.scss";
import { BackBtn } from "../../atom/buttons/backBtn";
import { KnowledgeVaultsPayload } from "@/types/knowledgebase";
import { gqlServerQuery } from "@/app/server_actions/gql";
import { getKnowledgeVaultsSchema } from "@/app/graphql/query/knowledge-base";
import { DocumentArea } from "../../element/knowledgebase_panel/document";

const getKnowledgeBase = async () => {
  const res = await gqlServerQuery<{
    getKnowledgeVaults: KnowledgeVaultsPayload;
  }>(getKnowledgeVaultsSchema);
  return res.data.getKnowledgeVaults;
};

export const KnowledgeBaseSettings = async () => {
  try {
    const knowledgeBase = await getKnowledgeBase();
    return (
      <div className={styles["BaseContainer"]}>
        <AddFolder />
        <KnowledgeBasePanel data={knowledgeBase!} />
      </div>
    );
  } catch (error: any) {
    console.error(error);
    return (
      <div className={styles["BaseContainer"]}>
        <Button>new</Button>
        <span>Error occured while loading component</span>
      </div>
    );
  }
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

      <div className={styles["DocumentArea"]}>
        <DocumentArea />
      </div>
    </div>
  );
};
