"use client"
import { Button, SignUpWithGoogleBtn } from "@/app/component/atom/buttons";
import { Heading3 } from "@/app/component/atom/headings";
import { TextField } from "@/app/component/molecules/textField";
import Link from "next/link";
import styles from "./index.module.scss";
import { useAuth } from "@/app/hooks/auth";
export const LoginForm = () => {
  const { email, password, setEmail, setPassword, loginHandler } = useAuth();
  return (
    <form className={styles["SignupForm"]} onSubmit={loginHandler}>
      <SignUpWithGoogleBtn
        buttonName="continue with google"
        handler={() => ""}
      />
      <TextField
        label="work Email"
        name="email"
        type="text"
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />
      <Button buttonName="login" type="submit" />
      <span className={styles["Heading3"]}>
        <Heading3>
          Don't have an account? <Link href={"/sign_up"}>SignUp Here</Link>{" "}
        </Heading3>
      </span>
    </form>
  );
};
