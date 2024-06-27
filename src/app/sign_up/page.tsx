import styles from "./signup.module.scss";
import { ProjectNameAndLogo } from "../component/molecules/projectName";
import { SignUpForm } from "../component/element/forms/signup";

const SignUp = () => {
  return (
    <div className={styles["Wrapper"]}>
      <ProjectNameAndLogo />
      <div className={styles["Auth-container"]}>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
