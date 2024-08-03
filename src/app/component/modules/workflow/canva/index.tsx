"use client";
import styles from "./index.module.scss";
import { ReactFlow, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomEdge from "../../../element/workflow/customEdge";
import { CustomNode } from "@/app/component/element/workflow/custom_node";
import { SelectNode } from "@/app/component/element/workflow/nodeSelector";
import { AddnodeInitial } from "@/app/component/element/workflow/canvas";

import { IoIosClose } from "react-icons/io";
import { useWorkflow } from "@/app/hooks/workflow";
import { useReactflowCustom } from "@/app/state-management/reactflow";

export const WorkflowCanvas = () => {
  const { edges, nodes, onEdgesChange, onNodesChange, onConnect } =
    useReactflowCustom();

  const nodeTypes = {
    CustomNode: CustomNode,
  };

  const edgeTypes = {
    customEdge: CustomEdge,
  };

  return (
    <>
      {/* <SelectNode /> */}
      <div className={styles["Container"]}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <AddnodeInitial />
        </ReactFlow>
      </div>
    </>
  );
};

export const WorkflowSettingsArea = () => {
  const { settingsData, closeSettingsPanel } = useWorkflow();
  return (
    <div
      className={`${styles["WorkflowSettingsArea"]} ${
        !settingsData.isOpen && styles["WorkflowSettingsAreaClose"]
      }`}
    >
      <IoIosClose
        onClick={closeSettingsPanel}
        className={styles["WorkflowSettingsAreaCloseIcon"]}
      />
      {settingsData.component}
    </div>
  );
};
