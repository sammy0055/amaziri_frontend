"use client";
import styles from "./alertcard.module.scss";
import { MdError, MdClose } from "react-icons/md";
import { useAlertHandler } from "@/app/hooks/common/alert";

export const AlertErrorCard: React.FC = () => {
  const { alertMessage, isAlertActive, color, openAndCloseAlertCard } =
    useAlertHandler();
  return (
    <div
      className={`${styles["Container"]} ${
        !isAlertActive ? styles["ErrorCardActive"] : ""
      }`}
    >
      <div className={styles["Text-Wrappper"]}>
        <span>
          <MdError className={styles["MdError"]} />
        </span>
        <span className={styles["Text"]}>{alertMessage}</span>
        <button>
          <MdClose
            onClick={openAndCloseAlertCard}
            className={styles["MdClose"]}
          />
        </button>
      </div>
    </div>
  );
};

import * as React from "react";
import Button from "@mui/joy/Button";
import Snackbar from "@mui/joy/Snackbar";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";

export default function SnackbarWithDecorators() {
  const { alertMessage, isAlertActive, color, openAndCloseAlertCard } =
    useAlertHandler();
  return (
    <React.Fragment>
      <Snackbar
        variant="soft"
        color={color}
        open={isAlertActive}
        onClose={openAndCloseAlertCard}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        endDecorator={
          <Button
            onClick={openAndCloseAlertCard}
            size="sm"
            variant="soft"
            color={color}
          >
            Dismiss
          </Button>
        }
      >
        {alertMessage}
      </Snackbar>
    </React.Fragment>
  );
}
