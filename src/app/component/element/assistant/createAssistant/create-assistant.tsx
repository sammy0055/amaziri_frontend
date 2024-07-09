"use client";
import { Divider, LinearProgress } from "@mui/joy";
import { PopUp } from "../../popup";
import styles from "./index.module.scss";
import { IconLabel } from "@/app/component/atom/typography";

import { IoCreateOutline } from "react-icons/io5";
import { CreateAssistantStep1 } from "./step1";
import { ReactNode, useState } from "react";
import { CreateAssistantStep2 } from "./step2";
import { CreateAssistantStep3 } from "./step3";
import { CreateAssistantStep4 } from "./step4";
import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import { CreateAssistantStep5 } from "./step5";

export const CreateAssistantFlow = () => {
  const [progress, setProgress] = useState(25);
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prevStep) => {
      if (prevStep < 3) return prevStep + 1;
      return prevStep;
    });
    setProgress((prevState) => prevState + 25);
  };

  const prevStep = () => {
    setStep((prevStep) => {
      if (prevStep > 0) return prevStep - 1;
      return prevStep;
    });
    setProgress((prevState) => prevState - 25);
  };

  const components: { [key: number]: ReactNode } = {
    0: <CreateAssistantStep1 handler={nextStep} />,
    1: <CreateAssistantStep2 nextStep={nextStep} prevStep={prevStep} />,
    2: <CreateAssistantStep3 nextStep={nextStep} prevStep={prevStep} />,
    3: <CreateAssistantStep4 nextStep={nextStep} prevStep={prevStep} />,
    // 4: <CreateAssistantStep5 />,
  };

  return (
    <PopUp customStyles={styles["Flow-Container"]}>
      <LinearProgress determinate value={progress} />
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

interface HeadingSectionProps {
  title: string;
  description: string;
}
export const HeadingSection: React.FC<HeadingSectionProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <div>
        <Heading customStyles={styles["Haeding"]}>{title}</Heading>
        <LabelParagraph>{description}</LabelParagraph>
      </div>
      <div className={styles["Divider"]}>
        <Divider />
      </div>
    </>
  );
};
