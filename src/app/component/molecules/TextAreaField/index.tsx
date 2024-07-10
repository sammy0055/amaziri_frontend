import { TextFieldProps } from "@/types/forms/input";
import styles from "./index.module.scss";
import { TextArea } from "../../atom/input";

interface TextAreaFieldProps extends TextFieldProps {
  customStyles?: any;
}
export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  ...props
}) => {
  return (
    <div className={styles["Container"]}>
      <label>{label}</label>
      <TextArea {...props} />
    </div>
  );
};
