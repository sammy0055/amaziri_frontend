import { MyEdges, MyNode } from "@/types/workflow";
import { Node } from "@xyflow/react";
import { ReactNode, useState } from "react";
import { v4 } from "uuid";
import { useErrorHandler } from "../common/error";
import { useGqlApiCall } from "../gqlApiCall";
import { addWorkflow } from "@/app/server_actions/workflow";
import {
  useActiveNodesValidationState,
  useWorkflowCanvasSettingsPanelState,
} from "@/app/state-management/utility-state";
import { useReactflowCustom } from "@/app/state-management/reactflow";
import { WorkflowSettingsComponent } from "@/app/component/element/workflow/canvas";

export const useWorkflow = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { setNodes, nodes, edges, workflowName } = useReactflowCustom();
  const [settingsData, setSettingsData] = useWorkflowCanvasSettingsPanelState();
  const [validNodes] = useActiveNodesValidationState();
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
    const isReceivingInput = edges.find((edge) => edge.target === nodeId);

    setNodes((prevNodes) => {
      const newNodes: Node[] = JSON.parse(JSON.stringify(prevNodes));
      newNodes.forEach((node: Node) => {
        if (node.id === nodeId) {
          if (isReceivingInput) node.data.isInputRequired = false;
          else node.data.isInputRequired = true;
        }
      });
      return newNodes;
    });

    return isReceivingInput;
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
    try {
      const allValid = nodes.every((node) => validNodes.includes(node.id));
      if (!allValid) throw new Error("one or more nodes is wrongly configured");
      setIsDisabled(true);
      const _nodes = nodes.map(({ id, position, measured, type, data }) => ({
        id,
        position,
        measured,
        type,
        data,
      }));

      WorflowSettingsComponent(<WorkflowSettingsComponent nodes={_nodes} />);
      const _edges = edges.map(({ id, source, target, type }) => ({
        id,
        source,
        target,
        type,
      })) as MyEdges[];

      const workflowData = {
        workflowName: workflowName,
        steps: { nodes: _nodes, edges: _edges },
      };

      // const data = await gqlApiCall(async (token) => {
      //   return await addWorkflow(workflowData, token);
      // });

      console.log("====================================");
      console.log({ workflowData });
      console.log("====================================");
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  const stopRunningWorkflow = () => {
    try {
      setIsDisabled(false);
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  return {
    settingsData,
    isDisabled,
    nodes,
    openSettingsPanel,
    closeSettingsPanel,
    sendworkflowData,
    stopRunningWorkflow,
    HandleSelectNode,
    WorflowSettingsComponent,
    inputRequired,
  };
};
