import {
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

export default function CustomEdge(props: any) {
  const { id, sourceX, sourceY, targetX, targetY } = props;
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
        >
          <span>delete edgePath</span>
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
