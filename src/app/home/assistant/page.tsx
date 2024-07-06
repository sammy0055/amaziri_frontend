import { AssistantArea, SettingsArea } from "@/app/component/element/assistant";
import styles from "./assistant.module.scss";
import { CreateAssistant } from "@/app/component/modules/assistant";

export default function Assistant() {
  return (
    <main className={styles["Container"]}>
      <SettingsArea />
      <AssistantArea />
      <CreateAssistant />
    </main>
  );
}
