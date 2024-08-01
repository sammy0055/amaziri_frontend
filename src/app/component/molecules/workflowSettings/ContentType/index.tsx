import { Heading, LabelParagraph } from "@/app/component/atom/headings";
import styles from "./index.module.scss";
import { Option, Select } from "@mui/joy";
import { InputProps } from "@/types/forms/input";

interface SelectContentTypeProps extends InputProps {
  title: string;
  description: string;
  handleChange: (e: any) => void;
}
export const SelectContentType: React.FC<SelectContentTypeProps> = ({
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
        placeholder={"choose your content type"}
        className={styles["SelectWrapper"]}
        defaultValue={"assistant"}
        onChange={handleChange}
      >
        <Option value={value}>hello</Option>
      </Select>
    </div>
  );
};
