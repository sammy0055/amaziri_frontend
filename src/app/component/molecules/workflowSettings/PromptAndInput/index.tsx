import styles from "./index.module.scss";
import { Heading, LabelParagraph } from "../../../atom/headings";
import { TextArea } from "../../../atom/input";
import { InputProps } from "@/types/forms/input";
import { ChangeEvent, useEffect, useState } from "react";

interface PromptProps {
  title: string;
  description: string;
  value: string;
  name: string;
  handleChange: (prompt: string) => void;
}
export const Prompt: React.FC<PromptProps> = ({
  title,
  description,
  value,
  name,
  handleChange,
}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleInputAreaChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
    handleChange(e.target.value);
  };
  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <LabelParagraph>{description}</LabelParagraph>
      <TextArea
        type="text"
        name={name}
        value={input}
        handleChange={handleInputAreaChange}
      />
    </div>
  );
};
