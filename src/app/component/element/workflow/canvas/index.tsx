"use client";
import { Panel, useReactFlow } from "@xyflow/react";
import styles from "./index.module.scss";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";
import { useOpenAndClosePopUp } from "@/app/state-management/utility-state";
import { PopUp } from "../../popup";
import Switcher from "@/app/component/atom/switch";
import { MdOutlineSchedule, MdOutlineSaveAs } from "react-icons/md";
import { Heading } from "@/app/component/atom/headings";
import { ActionListing } from "../action_listing";
import { useReactflowCustom } from "@/app/state-management/reactflow";
export const WorkflowCanvasHeading = () => {
  return (
    <div className={styles["WorkflowCanvasHeading"]}>
      <IoArrowBackCircleOutline className={styles["BackBtn"]} />
      <input type="text" value={"new senerio"} />
    </div>
  );
};

export const WorkflowCanvasFooterControls = () => {
  const [open, setOpen] = useOpenAndClosePopUp();
  return (
    <div className={styles["WorkflowCanvasFooterControls"]}>
      <div className={styles["ControlsContainer"]}>
        <div className={styles["RunContainer"]}>
          <div className={styles["RunWrapper"]}>
            <CiPlay1 size={30} color="white" />
          </div>
          <Heading customStyles={styles["RunContainerHeading"]}>
            Run once
          </Heading>
        </div>
        <div className={styles["SheduleWrapper"]}>
          <Switcher />
          <span className={styles["Schedule"]}>
            <MdOutlineSchedule size={20} />
            <span>Every 15 minutes</span>
          </span>
          <div className={styles["MiniBox"]}>
            <MdOutlineSaveAs size={20} />
          </div>
          <div className={styles["MiniBox"]} onClick={() => setOpen(!open)}>
            <FaPlus size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddnodeInitial = () => {
  const { nodes } = useReactflowCustom();
  const [open, setOpen] = useOpenAndClosePopUp();
  const isNodeEmpty = nodes.length === 0;
  return (
    <>
      {isNodeEmpty && (
        <Panel className={styles["AddnodeInitial"]}>
          <span
            className={styles["AddnodeInitialIconWrapper"]}
            onClick={() => setOpen(!open)}
          >
            <span>
              <FaPlus className={styles["AddnodeInitialIcon"]} />
            </span>
          </span>
        </Panel>
      )}
      <PopUp>
        <ActionListing />
      </PopUp>
    </>
  );
};
