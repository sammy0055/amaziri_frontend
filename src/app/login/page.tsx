import styles from "./login.module.scss";
import { ProjectNameAndLogo } from "../component/molecules/projectName";
import { LoginForm } from "../component/element/forms/login";

const Login = () => {
  return (
    <div className={styles["Wrapper"]}>
      <ProjectNameAndLogo />
      <div className={styles["Auth-container"]}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
