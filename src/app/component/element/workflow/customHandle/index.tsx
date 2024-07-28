import { Handle, Position } from "@xyflow/react";

interface CustomHandleProps {
  position: Position;
  type: "target" | "source";
}

export const CustomHandle: React.FC<CustomHandleProps> = ({
  position,
  type,
}) => {
  return (
    <Handle
      type={type}
      position={position}
      style={{
        width: "1rem",
        height: "1rem",
        backgroundColor: "red",
        textAlign: "center",
      }}
    />
  );
};
