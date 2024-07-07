"use client";
import { LinearProgress } from "@mui/joy";
import { PopUp } from "../../popup";
import styles from "./index.module.scss";
import { IconLabel } from "@/app/component/atom/typography";

import { IoCreateOutline } from "react-icons/io5";
import { CreateAssistantStep1 } from "./step1";
import { ReactNode, useState } from "react";
import { CreateAssistantStep2 } from "./step2";
import { CreateAssistantStep3 } from "./step3";
import { CreateAssistantStep4 } from "./step4";

export const CreateAssistantFlow = () => {
  const [step, setStep] = useState(2);

  const nextStep = () =>
    setStep((prevStep) => {
      if (prevStep < 3) return prevStep + 1;
      return prevStep;
    });

  const prevStep = () => {
    setStep((prevStep) => {
      if (prevStep > 0) return prevStep - 1;
      return prevStep;
    });
  };

  const components: { [key: number]: ReactNode } = {
    0: <CreateAssistantStep1 handler={nextStep} />,
    1: <CreateAssistantStep2 nextStep={nextStep} prevStep={prevStep} />,
    2: <CreateAssistantStep3 nextStep={nextStep} prevStep={prevStep} />,
    3: <CreateAssistantStep4 nextStep={nextStep} prevStep={prevStep} />,
  };

  return (
    <PopUp customStyles={styles["Flow-Container"]}>
      <LinearProgress determinate value={25} />
      <div className={styles["PopUpContent"]}>
        <SectionLabel />
        {components[step]}
      </div>
    </PopUp>
  );
};

export const SectionLabel = () => {
  return (
    <div className={styles["SectionLabel"]}>
      <IoCreateOutline size={20} />
      <IconLabel text="CREATE YOUR ASSISTANT" />
    </div>
  );
};
