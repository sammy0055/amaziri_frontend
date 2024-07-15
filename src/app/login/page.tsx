import styles from "./login.module.scss";
import { ProjectNameAndLogo } from "../component/molecules/projectName";
import { LoginForm } from "../component/element/forms/login";
import { Suspense } from "react";
import SnackbarWithDecorators from "../component/element/cards/alertCard";

const Login = () => {
  return (
    <div className={styles["Wrapper"]}>
      <ProjectNameAndLogo />
      <div className={styles["Auth-container"]}>
        <Suspense fallback={<h2>loading...</h2>}>
          <LoginForm />
        </Suspense>
        <SnackbarWithDecorators />
      </div>
    </div>
  );
};

export default Login;
