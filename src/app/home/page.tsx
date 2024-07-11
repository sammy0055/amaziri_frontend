import { isProfileComplete } from "@/helpers/profile/getProfile";
import { redirect } from "next/navigation";
import styles from "./home.module.scss";
import { ChatAreaWrapper } from "../component/modules/chat";
import { gqlServerQuery } from "../server_actions/gql";
import { getAssistantsSchema } from "../graphql/mutation/assistant";
import { AssistantsPayload } from "@/types/assistant";

const homeData = async () => {
  const isProfileCompleted = await isProfileComplete();
  if (!isProfileCompleted) redirect("/profile_setup?continueUrl=home");

  const serverQuery = await gqlServerQuery();
  const payload = await serverQuery<{ getAssistants: AssistantsPayload }>(
    getAssistantsSchema
  );
  const isAssistantEmpty = payload?.data?.getAssistants?.data?.length;
  if (!isAssistantEmpty) return redirect("/home/assistant");
  return payload?.data?.getAssistants;
};

const Home = async () => {
  const data = await homeData();
  return (
    <section>
      <ChatAreaWrapper data={data?.data} />
    </section>
  );
};

export default Home;
