import styles from "./input.module.scss";
import { InputProps } from "@/types/forms/input";

export const Input: React.FC<InputProps> = ({
  value,
  type,
  name,
  handleChange,
}) => {
  return (
    <input
      className={styles["Input"]}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};

interface TextAreaProps extends InputProps {
  customStyles?: any;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
export const TextArea: React.FC<TextAreaProps> = ({
  value,
  name,
  customStyles,
  handleChange,
  handleKeyDown,
}) => {
  return (
    <textarea
      className={`${styles["Textarea"]} ${customStyles}`}
      name={name}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
