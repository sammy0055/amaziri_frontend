import { MyEdges, MyNode } from "@/types/workflow";
import { useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { v4 } from "uuid";
import { useErrorHandler } from "../common/error";
import { useGqlApiCall } from "../gqlApiCall";
import { addWorkflow } from "@/app/server_actions/workflow";

export const useWorkflow = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { handleError } = useErrorHandler();
  const gqlApiCall = useGqlApiCall();

  const { setNodes, getNodes, getEdges } = useReactFlow();
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
    const nodes = getNodes().map(({ id, position, measured, type, data }) => ({
      id,
      position,
      measured,
      type,
      data,
    }));

    const edges = getEdges().map(({ id, source, target, type }) => ({
      id,
      source,
      target,
      type,
    })) as MyEdges[];

    const workflowData = {
      workflowName: "test workflow",
      steps: { nodes, edges },
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

  return { sendworkflowData, HandleSelectNode };
};
