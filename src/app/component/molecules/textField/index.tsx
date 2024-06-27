import { Input } from "@/app/component/atom/input";
import { TextFieldProps } from "@/types/forms/input";
import styles from "./textfied.module.scss"
export const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  return (
    <div className={styles["Container"]}>
      <label>{label}</label>
      <Input {...props} />
    </div>
  );
};
