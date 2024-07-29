"use client";
import { v4 } from "uuid";
import styles from "./index.module.scss";
import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  addEdge,
  Connection,
  ReactFlowProvider,
  Node,
  Edge,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo } from "react";
import CustomEdge from "../../../element/workflow/customEdge";
import { CustomNode } from "@/app/component/element/workflow/custom_node";
import { SelectNode } from "@/app/component/element/workflow/nodeSelector";
import { AddnodeInitial } from "@/app/component/element/workflow/canvas";
import { useWorkflowCanvasSettingsPanelState } from "@/app/state-management/utility-state";

import { IoIosClose } from "react-icons/io";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const initialNodeTypes = {
    CustomNode: CustomNode,
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const edge = { ...params, type: "customEdge", id: v4() };
      return setEdges((prevEdge) => addEdge(edge, prevEdge as any));
    },
    [setEdges]
  );

  const nodeTypes = useMemo(() => initialNodeTypes, []);
  const edgeTypes = {
    customEdge: CustomEdge,
  };

  return (
    <ReactFlowProvider>
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
    </ReactFlowProvider>
  );
};

export const WorkflowSettingsArea = () => {
  const [open, setOpen] = useWorkflowCanvasSettingsPanelState();
  return (
    <div
      className={`${styles["WorkflowSettingsArea"]} ${
        !open && styles["WorkflowSettingsAreaClose"]
      }`}
    >
      <IoIosClose
        onClick={() => setOpen(!open)}
        className={styles["WorkflowSettingsAreaCloseIcon"]}
      />
      <div style={{ height: "13rem" }}>welcom to settings</div>
      <div style={{ height: "13rem" }}>welcom to settings</div>

      <div style={{ height: "13rem" }}>welcom to settings</div>
      <div style={{ height: "13rem" }}>welcom to settings</div>
      <div style={{ height: "13rem" }}>welcom to settings</div>
      <div style={{ height: "13rem" }}>welcom to settings</div>
    </div>
  );
};
