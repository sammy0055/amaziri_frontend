"use client";
import styles from "./popup.module.scss";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { useOpenAndClosePopUp } from "@/app/state-management/utility-state";
import { ReactNode } from "react";

interface PopUpProps {
  children: ReactNode;
  customStyles?: any;
}
export const PopUp: React.FC<PopUpProps> = ({ children, customStyles }) => {
  const [open, setOpen] = useOpenAndClosePopUp();
  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className={`${styles["PopUp"]} ${customStyles}`}>
          <ModalClose variant="plain" sx={{ m: 1 }} />
          {children}
        </div>
      </Modal>
    </>
  );
};
