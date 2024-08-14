import {
  WorkflowMainArea,
  WorkflowMainSetttingsArea,
} from "@/app/component/modules/workflow/main_area";
import styles from "./workflow.module.scss";
export default function Workflow() {
  return (
    <main className={styles["Workflow"]}>
      <WorkflowMainSetttingsArea />
      <WorkflowMainArea />
    </main>
  );
}
