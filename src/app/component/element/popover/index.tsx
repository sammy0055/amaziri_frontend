import Popover from "@mui/material/Popover";
import { ComponentType, ReactNode, useState } from "react";

interface BasicPopoverProps {
  ButtonComponent: ComponentType<{
    onClick: (event: any) => void;
  }>;
  PopUpContent: ReactNode;
}
export const BasicPopover: React.FC<BasicPopoverProps> = ({
  ButtonComponent,
  PopUpContent,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <ButtonComponent onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: ".5rem" }}>{PopUpContent}</div>
      </Popover>
    </div>
  );
};
