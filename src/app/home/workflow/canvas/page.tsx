import { WorkflowCanvas } from "@/app/component/modules/workflow/canva";
import styles from "./index.module.scss";
import {
  WorkflowCanvasFooterControls,
  WorkflowCanvasHeading,
} from "@/app/component/element/workflow/canvas";
export default function WorkflowCanvasView() {
  return (
    <main className={styles["Workflow"]}>
      <WorkflowCanvasHeading />
      <WorkflowCanvas />
      <WorkflowCanvasFooterControls />
    </main>
  );
}
