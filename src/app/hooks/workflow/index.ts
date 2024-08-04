import { MyEdges, MyNode } from "@/types/workflow";
import { Node, useReactFlow } from "@xyflow/react";
import { ReactNode, useState } from "react";
import { v4 } from "uuid";
import { useErrorHandler } from "../common/error";
import { useGqlApiCall } from "../gqlApiCall";
import { addWorkflow } from "@/app/server_actions/workflow";
import { useWorkflowCanvasSettingsPanelState } from "@/app/state-management/utility-state";
import { useReactflowCustom } from "@/app/state-management/reactflow";

export const useWorkflow = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { setNodes, nodes, edges } = useReactflowCustom();
  const [settingsData, setSettingsData] = useWorkflowCanvasSettingsPanelState();
  const { handleError } = useErrorHandler();
  const gqlApiCall = useGqlApiCall();

  const openSettingsPanel = () =>
    setSettingsData((prevState) => ({ ...prevState, isOpen: true }));

  const closeSettingsPanel = () =>
    setSettingsData((prevState) => ({ ...prevState, isOpen: false }));

  const WorflowSettingsComponent = (component: ReactNode) => {
    setSettingsData((prevNode) => ({
      ...prevNode,
      isOpen: true,
      component: component,
    }));
  };

  const inputRequired = (nodeId: string) => {
    const isInput = edges.find((edge) => edge.target === nodeId);
    if (!isInput) {
      setNodes((prevNodes) => {
        const newNodes: Node[] = JSON.parse(JSON.stringify(prevNodes));
        newNodes.forEach((node: Node) => {
          if (node.id === nodeId) node.data.isInputRequired = false;
        });
        return newNodes;
      });
    }
    return isInput;
  };

  const HandleSelectNode = (node: MyNode) => {
    if (node) {
      node.id = v4();
      node.type = "CustomNode";
      setNodes((prevNode: MyNode[]) => {
        if (!prevNode.length) node.data.trigger = true;
        return [...prevNode, node];
      });
    }
  };

  const sendworkflowData = async () => {
    const _nodes = nodes.map(({ id, position, measured, type, data }) => ({
      id,
      position,
      measured,
      type,
      data,
    }));

    const _edges = edges.map(({ id, source, target, type }) => ({
      id,
      source,
      target,
      type,
    })) as MyEdges[];

    const workflowData = {
      workflowName: "test workflow",
      steps: { nodes: _nodes, edges: _edges },
    };

    try {
      const data = await gqlApiCall(async (token) => {
        return await addWorkflow(workflowData, token);
      });

      console.log("====================================");
      console.log({ nodes, edges, data });
      console.log("====================================");
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  return {
    settingsData,
    openSettingsPanel,
    closeSettingsPanel,
    sendworkflowData,
    HandleSelectNode,
    WorflowSettingsComponent,
    inputRequired,
  };
};
