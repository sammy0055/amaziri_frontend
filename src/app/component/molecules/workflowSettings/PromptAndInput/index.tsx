import styles from "./index.module.scss";
import { Heading, LabelParagraph } from "../../../atom/headings";
import { TextArea } from "../../../atom/input";
import { InputProps } from "@/types/forms/input";

interface PromptProps extends InputProps {
  title: string;
  description: string;
}
export const Prompt: React.FC<PromptProps> = ({
  title,
  description,
  value,
  type,
  name,
  handleChange,
}) => {
  return (
    <div>
      <Heading customStyles={styles["HeadingLabel"]}>{title}</Heading>
      <LabelParagraph>{description}</LabelParagraph>
      <TextArea
        type={type}
        name={name}
        value={value}
        handleChange={handleChange}
      />
    </div>
  );
};
