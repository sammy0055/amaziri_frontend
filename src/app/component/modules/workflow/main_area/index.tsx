"use client";
import styles from "./index.module.scss";
import { Button } from "@/app/component/atom/buttons";
import { BackBtn } from "@/app/component/atom/buttons/backBtn";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { useReactflowCustom } from "@/app/state-management/reactflow";
import { IconArray } from "@/data/action_data";
import { ActionNames, ActionType } from "@/types/workflow";
import { Divider } from "@mui/joy";
import { useRouter } from "next/navigation";
import { IoIosAddCircle } from "react-icons/io";

export const WorkflowMainSetttingsArea = () => {
  const { push } = useRouter();
  const { onWorkflowNameChange } = useReactflowCustom();

  const handleAdd = () => {
    onWorkflowNameChange("new workflow");
    push("/home/workflow/canvas");
  };
  return (
    <>
      {" "}
      <div className={styles["SettingsArea"]}>
        <div className={styles["Section1"]}>
          <BackBtn />
          <div>
            <Heading>Workflows</Heading>
            <LabelParagraph customStyles={styles["Haeding"]}>
              Create and Manage your workflow.
            </LabelParagraph>
          </div>
        </div>

        <div className={styles["Section2"]}>
          <Button handler={handleAdd}>
            <div className={styles["AddBtn"]}>
              <IoIosAddCircle size={20} />
              <span>create workflow</span>
            </div>
          </Button>
        </div>
      </div>
      <Divider />
    </>
  );
};

export const WorkflowMainArea = () => {
  return (
    <>
      <AllWorkflow />
    </>
  );
};

const AllWorkflow = () => {
  const Icon = IconArray[ActionType.AI].Icon;
  const color = IconArray[ActionType.AI].color;
  return (
    <div className={styles["Container"]}>
      <div className={styles["WorkflowItem"]}>
        <div className={styles["IconContainer"]}>
          <div
            className={styles["IconList"]}
            style={{ backgroundColor: color }}
          >
            <Icon color="white" size={20} />
          </div>
          <div
            className={styles["IconList"]}
            style={{ backgroundColor: color }}
          >
            <Icon color="white" size={20} />
          </div>
          <div
            className={styles["IconList"]}
            style={{ backgroundColor: color }}
          >
            <Icon color="white" size={20} />
          </div>
        </div>
        <Heading customStyles={styles["CustomHeading"]}>test workflow</Heading>
      </div>
    </div>
  );
};

const RunningWorkflow = () => {
  const Icon = IconArray[ActionType.AI].Icon;
  const color = IconArray[ActionType.AI].color;
  return (
    <div className={styles["Container"]}>
      <div className={styles["WorkflowItem"]}>
        <div className={styles["IconContainer"]}>
          <div
            className={styles["IconList"]}
            style={{ backgroundColor: color }}
          >
            <Icon color="white" size={20} />
          </div>

          <div
            className={styles["IconList"]}
            style={{ backgroundColor: color }}
          >
            <Icon color="white" size={20} />
          </div>
        </div>
        <Heading customStyles={styles["CustomHeading"]}>test workflow</Heading>
      </div>
    </div>
  );
};
