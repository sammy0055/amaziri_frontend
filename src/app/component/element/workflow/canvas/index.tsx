"use client";
import { Panel } from "@xyflow/react";
import styles from "./index.module.scss";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { CiPlay1, CiStop1 } from "react-icons/ci";
import { useOpenAndClosePopUp } from "@/app/state-management/utility-state";
import { PopUp } from "../../popup";
import Switcher from "@/app/component/atom/switch";
import { MdOutlineSchedule, MdOutlineSaveAs } from "react-icons/md";
import { Heading } from "@/app/component/atom/headings";
import { ActionListing } from "../action_listing";
import { useReactflowCustom } from "@/app/state-management/reactflow";
import { useWorkflow } from "@/app/hooks/workflow";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
} from "@mui/joy";
import { MyNode } from "@/types/workflow";
import { useSubscription } from "@apollo/client";
import { WORKFLOW_SUBSCRIPTION_SCHEMA } from "@/app/graphql/subscription";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export const WorkflowCanvasHeading = () => {
  const { back } = useRouter();
  const { onWorkflowNameChange, workflowName } = useReactflowCustom();
  return (
    <div className={styles["WorkflowCanvasHeading"]}>
      <IoArrowBackCircleOutline
        className={styles["BackBtn"]}
        onClick={() =>    back()}
      />
      <input
        type="text"
        value={workflowName}
        onChange={(e) => onWorkflowNameChange(e.target.value)}
      />
    </div>
  );
};

export const WorkflowCanvasFooterControls = () => {
  const [open, setOpen] = useOpenAndClosePopUp();
  const {
    stopRunningWorkflow,
    sendworkflowData,
    WorflowSettingsComponent,
    isDisabled,
    nodes,
  } = useWorkflow();

  const RunWorkflow = async () => {
    await sendworkflowData();
  };

  const PlayWorkflow = isDisabled ? (
    <CiStop1 size={30} color="white" onClick={stopRunningWorkflow} />
  ) : (
    <CiPlay1 size={30} color="white" onClick={RunWorkflow} />
  );
  return (
    <div className={styles["WorkflowCanvasFooterControls"]}>
      <div className={styles["ControlsContainer"]}>
        <div className={styles["RunContainer"]}>
          <div
            className={`${styles["RunWrapper"]} ${
              isDisabled && styles["RunWrapperActive"]
            }`}
          >
            {PlayWorkflow}
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

interface SettingsProps {
  nodes: MyNode[];
}
export const WorkflowSettingsComponent: React.FC<SettingsProps> = ({
  nodes,
}) => {
  const { data, loading, error } = useSubscription(
    WORKFLOW_SUBSCRIPTION_SCHEMA,
    {
      variables: { workflowId: "66a20dba8e044cfede3c842c" },
      context: {
        headers: {
          Authorization: "",
        },
      },
    }
  );

  useEffect(() => {
    console.log("====================================");
    console.log(data, loading, error);
    console.log("====================================");
  });
  return (
    <div>
      <AccordionGroup sx={{ maxWidth: 400 }}>
        {nodes?.map((node) => {
          return (
            <Accordion key={node.id}>
              <AccordionSummary>{node.data.actionName}</AccordionSummary>
              <AccordionDetails>{node.data.description}</AccordionDetails>
            </Accordion>
          );
        })}
      </AccordionGroup>
    </div>
  );
};
