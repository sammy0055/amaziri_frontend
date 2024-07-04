import styles from "./index.module.scss";
import { KnowledgeVaultsPayload } from "@/types/knowledgebase";
import { gqlServerQuery } from "@/app/server_actions/gql";
import { getKnowledgeVaultsSchema } from "@/app/graphql/query/knowledge-base";
import {
  AddFolder,
  KnowledgeBasePanel,
} from "../../element/knowledgebase_panel";
import { Button } from "../../atom/buttons";
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
