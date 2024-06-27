import { isProfileComplete } from "@/helpers/profile/getProfile";
import { redirect } from "next/navigation";
import styles from "./home.module.scss";

const homeData = async () => {
  const isProfileCompleted = await isProfileComplete();
  if (!isProfileCompleted) redirect("/profile_setup?continueUrl=home");
};

const Home = async () => {
  // await homeData();
  return (
    <section>
      <h1>welcome to home page</h1>
    </section>
  );
};

export default Home;
