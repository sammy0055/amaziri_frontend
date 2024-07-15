"use client";
import { Button, SignUpWithGoogleBtn } from "@/app/component/atom/buttons";
import { Heading3 } from "@/app/component/atom/headings";
import { TextField } from "@/app/component/molecules/textField";
import Link from "next/link";
import styles from "./index.module.scss";
import { useAuth } from "@/app/hooks/auth";
export const LoginForm = () => {
  const { email, password, isDisabled, setEmail, setPassword, loginHandler } =
    useAuth();
  return (
    <form className={styles["SignupForm"]} onSubmit={loginHandler}>
      <SignUpWithGoogleBtn handler={() => ""}>
        continue with google
      </SignUpWithGoogleBtn>
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
      <Button type="submit" isDisabled={isDisabled}>
        login
      </Button>
      <span className={styles["Heading3"]}>
        <Heading3>
          <span>
            {" "}
            Don't have an account? <Link href={"/sign_up"}>
              SignUp Here
            </Link>{" "}
          </span>
        </Heading3>
      </span>
    </form>
  );
};
