import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./index.module.scss";
import { Option, Select } from "@mui/joy";
import { useEffect, useState } from "react";

interface SelectAssistantProp {
  title: string;
  description: string;
  value:string
  handleChange: (e: any) => void;
}
export const SelectAssistant: React.FC<SelectAssistantProp> = ({
  title,
  description,
  value,
  handleChange,
}) => {
  const [assistantId, setAssitantId] = useState("");
  const handleSelectChange = (e: any, newValue: any) => {
    setAssitantId(newValue);
    handleChange(newValue);
  };

  useEffect(() => {
    setAssitantId(value);
  }, [value]);
  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <LabelParagraph>{description}</LabelParagraph>
      <Select
        placeholder={"choose your assistant"}
        className={styles["SelectWrapper"]}
        value={assistantId}
        onChange={handleSelectChange}
      >
        <Option value={"id-one"}>hello</Option>
        <Option value={"id-tow"}>id two</Option>
      </Select>
    </div>
  );
};
