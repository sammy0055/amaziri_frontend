"use client";
import { Button, SignUpWithGoogleBtn } from "@/app/component/atom/buttons";
import { Heading3, LabelParagraph } from "@/app/component/atom/headings";
import { TextField } from "@/app/component/molecules/textField";
import Link from "next/link";
import styles from "./index.module.scss";
import { useAuth } from "@/app/hooks/auth";
export const SignUpForm = () => {
  const { email, password, setEmail, setPassword, signUpHandler } = useAuth();
  return (
    <form className={styles["SignupForm"]} onSubmit={signUpHandler}>
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
      <Button type="submit" buttonName="sign up" />
      <span className={styles["Heading3"]}>
        <Heading3>
          Already have an account? <Link href={"/login"}>Log in</Link>{" "}
        </Heading3>
      </span>
      <span className={styles["Heading3"]}>
        <LabelParagraph>
          <i>
            By signing up, you agree to our Terms of Service and privacy policy.
          </i>
        </LabelParagraph>
      </span>
    </form>
  );
};
