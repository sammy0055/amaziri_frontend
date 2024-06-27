"use client";
import { Button } from "@/app/component/atom/buttons";
import { TextField } from "@/app/component/molecules/textField";
import styles from "./index.module.scss";
import { useProfile } from "@/app/hooks/profile";

export const ProfileSetupForm = () => {
  const { profile, isDisabled, handleProfileChange, handleFormSubmit } =
    useProfile();
  return (
    <form className={styles["ProfileSetup"]} onSubmit={handleFormSubmit}>
      <TextField
        label="First Name"
        name="firstName"
        type="text"
        value={profile.firstName}
        handleChange={(e) => handleProfileChange(e)}
      />
      <TextField
        label="Last Name"
        name="lastName"
        type="text"
        value={profile.lastName}
        handleChange={(e) => handleProfileChange(e)}
      />
      <TextField
        label="Organization"
        name="organization"
        type="text"
        value={profile.organization}
        handleChange={(e) => handleProfileChange(e)}
      />
      <Button buttonName="continue" type="submit" isDisabled={isDisabled} />
    </form>
  );
};
