import styles from "./knowledgebase.module.scss";
import { KnowledgeBaseArea, KnowledgeBaseSettings } from "@/app/component/modules/knowledgebase";

export default function KnowledgeBase() {
  return (
    <>
      <section className={styles["Container"]}>
        <KnowledgeBaseSettings />
        <KnowledgeBaseArea />
      </section>
    </>
  );
}
