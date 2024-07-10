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
}
export const TextArea: React.FC<TextAreaProps> = ({
  value,
  name,
  customStyles,
  handleChange,
}) => {
  return (
    <textarea
      className={`${styles["Input"]} ${customStyles}`}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};
