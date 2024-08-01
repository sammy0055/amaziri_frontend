import {
  WorkflowCanvas,
  WorkflowSettingsArea,
} from "@/app/component/modules/workflow/canva";
import styles from "./index.module.scss";
import {
  WorkflowCanvasFooterControls,
  WorkflowCanvasHeading,
} from "@/app/component/element/workflow/canvas";
import { ReactFlowProvider } from "@xyflow/react";
export default function WorkflowCanvasView() {
  return (
    <main className={styles["Workflow"]}>
      <ReactFlowProvider>
        <div className={styles["WorkflowEditArea"]}>
          <WorkflowCanvasHeading />
          <WorkflowCanvas />
          <WorkflowCanvasFooterControls />
        </div>
        <WorkflowSettingsArea />
      </ReactFlowProvider>
    </main>
  );
}
