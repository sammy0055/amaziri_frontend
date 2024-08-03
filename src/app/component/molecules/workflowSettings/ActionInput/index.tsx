import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./index.module.scss";
import { Input } from "@/app/component/atom/input";
import { InputProps } from "@/types/forms/input";
import { useState } from "react";
import { ContentApprovalParams } from "@/types/workflow";
import { IconLabel } from "@/app/component/atom/typography";
import { BiPlus } from "react-icons/bi";

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
  handleChange: (data: string, action: "add" | "remove") => void;
}

export const AddApprovals: React.FC<AddApprovalsProps> = ({
  title,
  description,
  approvers,
  handleChange,
}) => {
  const [input, setInput] = useState("");
  const handleInput = (action: "add" | "remove", data: string) => {
    handleChange(data, action);
    setInput("");
  };

  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <LabelParagraph>{description}</LabelParagraph>
      {approvers.map((item, index) => (
        <div className={styles["InputArrayItem"]} key={index}>
          <IconLabel text={item} />{" "}
          <BiPlus
            className={styles["InputArrayItemIcon"]}
            onClick={() => handleInput("remove", item)}
          />
        </div>
      ))}
      <div>
        <Input
          type="text"
          value={input}
          name=""
          handleChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button onClick={() => handleInput("add", input)}>add</button>
    </div>
  );
};
