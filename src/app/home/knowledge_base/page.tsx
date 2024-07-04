import { KnowledgeBaseSettings } from "@/app/component/modules/knowledgebase/settings";
import styles from "./knowledgebase.module.scss";
import {
  KnowledgeBaseArea,
} from "@/app/component/modules/knowledgebase";


export default async function KnowledgeBase() {
  return (
    <section className={styles["Container"]}>
      <KnowledgeBaseSettings />
      <KnowledgeBaseArea />
    </section>
  );
}
