import { v4 } from "uuid";
import { atom, useRecoilState } from "recoil";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "@xyflow/react";
import { useCallback } from "react";

const reactflow = atom<{
  workflowName: string;
  nodes: Node[];
  edges: Edge[];
}>({
  key: v4(),
  default: {
    workflowName: "",
    nodes: [],
    edges: [],
  },
});

export const useReactflowState = () => useRecoilState(reactflow);
export const useReactflowCustom = () => {
  const [{ nodes, edges, workflowName }, setReactflowState] = useReactflowState();
  const onNodesChange = (changes: NodeChange<Node>[]) => {
    const newNodes = applyNodeChanges(changes, nodes);
    setReactflowState((prevState) => ({ ...prevState, nodes: newNodes }));
  };

  const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
    const newEdges = applyEdgeChanges(changes, edges);
    setReactflowState((prevState) => ({ ...prevState, edges: newEdges }));
  };

  const setNodes = (fn: (nodes: Node[]) => Node[]) => {
    const newNodes = fn(nodes);
    setReactflowState((prevState) => ({ ...prevState, nodes: newNodes }));
  };
  const setEdges = (fn: (edges: Edge[]) => Edge[]) => {
    const newEdges = fn(edges);
    setReactflowState((prevState) => ({ ...prevState, edges: newEdges }));
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, type: "customEdge", id: v4() };
      return setEdges((prevEdge) => addEdge(edge, prevEdge as any));
    },
    [setEdges]
  );

  const onWorkflowNameChange = (value: string) => {
    setReactflowState((prevState) => ({
      ...prevState,
      workflowName: value || "",
    }));
  };
  return {
    onWorkflowNameChange,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
    nodes,
    edges,
    workflowName
  };
};
