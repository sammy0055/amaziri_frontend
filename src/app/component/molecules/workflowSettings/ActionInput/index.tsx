import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./index.module.scss";
import { Input } from "@/app/component/atom/input";
import { InputProps } from "@/types/forms/input";
import { useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { ContentApprovalParams } from "@/types/workflow";

interface ActionInputProps extends InputProps {
  title: string;
  description?: string;
}
export const ActionInput: React.FC<ActionInputProps> = ({
  title,
  value,
  type,
  name,
  handleChange,
}) => {
  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <Input
        type={type}
        name={name}
        value={value}
        handleChange={handleChange}
      />
    </div>
  );
};

interface AddApprovalsProps extends Pick<ContentApprovalParams, "approvers"> {
  title: string;
  description?: string;
  handleChange: (data: string) => void;
}

export const AddApprovals: React.FC<AddApprovalsProps> = ({
  title,
  description,
  approvers,
  handleChange,
}) => {
  const [input, setInput] = useState("");
console.log('====================================');
console.log(approvers);
console.log('====================================');
  const handleInput = () => {
    handleChange(input);
    setInput("");
  };
  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <LabelParagraph>{description}</LabelParagraph>
      {approvers.map((item) => (
        <div>{item}</div>
      ))}
      <div>
        <Input
          type="text"
          value={input}
          name=""
          handleChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button onClick={handleInput}>add</button>
    </div>
  );
};
