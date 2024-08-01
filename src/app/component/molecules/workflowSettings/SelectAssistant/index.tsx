import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./index.module.scss";
import { Option, Select } from "@mui/joy";
import { InputProps } from "@/types/forms/input";

interface SelectAssistantProp extends InputProps {
  title: string;
  description: string;
  handleChange: (e: any) => void;
}
export const SelectAssistant: React.FC<SelectAssistantProp> = ({
  title,
  description,
  value,
  handleChange,
}) => {
  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <LabelParagraph>{description}</LabelParagraph>
      <Select
        placeholder={"choose your assistant"}
        className={styles["SelectWrapper"]}
        defaultValue={"assistant"}
        onChange={handleChange}
      >
        <Option value={value}>hello</Option>
      </Select>
    </div>
  );
};
