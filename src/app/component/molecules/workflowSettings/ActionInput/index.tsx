import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./index.module.scss";
import { Input } from "@/app/component/atom/input";
import { InputProps } from "@/types/forms/input";
import { useEffect, useState } from "react";
import { ActionType, ContentApprovalParams } from "@/types/workflow";
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

interface AddApprovalsProps {
  title: string;
  description?: string;
  valueList: string[];
  handleChange: (data: string, action: "add" | "remove") => void;
}

export const InputArray: React.FC<AddApprovalsProps> = ({
  title,
  description,
  valueList,
  handleChange,
}) => {
  const [input, setInput] = useState("");
  const [valueLista, setValueLista] = useState<string[]>([]);
  const handleInput = (action: "add" | "remove", data: string) => {
    if (action === "add") {
      handleChange(data, action);
      setValueLista((valueList) => {
        return [...valueList, data];
      });
      setInput("");
    }

    if (action === "remove") {
      handleChange(data, action);
      setValueLista((valueList) => {
        return [...valueList].filter((value) => value !== data);
      });
    }
  };

  useEffect(() => {
    setValueLista(valueList);
  }, [valueList]);

  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <LabelParagraph>{description}</LabelParagraph>
      {valueLista.map((item, index) => (
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
