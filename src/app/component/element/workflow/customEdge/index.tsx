import {
  BaseEdge,
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";
import styles from "./index.module.scss";
import { TbTool } from "react-icons/tb";
import { useReactflowCustom } from "@/app/state-management/reactflow";
export default function CustomEdge(props: any) {
  const { id, sourceX, sourceY, targetX, targetY } = props;
  const { setEdges } = useReactflowCustom();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className={styles["EdgesBtn"]}
          onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
        >
          <TbTool size={10} />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
