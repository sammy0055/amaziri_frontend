import { Handle, Position } from "@xyflow/react";
import styles from "./index.module.scss";
interface CustomHandleProps {
  position: Position;
  type: "target" | "source";
  color: string;
}

export const CustomHandle: React.FC<CustomHandleProps> = ({
  position,
  type,
  color,
}) => {
  return (
    <Handle
      type={type}
      position={position}
      className={styles["Handle"]}
      style={{ backgroundColor: color }}
    />
  );
};
