import { ProfileSetupForm } from "../component/element/forms/profile";
import { ProjectNameAndLogo } from "../component/molecules/projectName";
import styles from "./profile-setup.module.scss";

const ProfileSetup = () => {
  return (
    <main className={styles["Wrapper"]}>
      <ProjectNameAndLogo />
      <div className={styles["Auth-container"]}>
        <ProfileSetupForm />
      </div>
    </main>
  );
};

export default ProfileSetup;
