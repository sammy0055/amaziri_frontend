import { AssistantArea, SettingsArea } from "@/app/component/element/assistant";
import styles from "./assistant.module.scss";
import { CreateAssistant } from "@/app/component/modules/assistant";
import { gqlServerQuery } from "@/app/server_actions/gql";
import { getAssistantsSchema } from "@/app/graphql/mutation/assistant";
import { AssistantsPayload } from "@/types/assistant";

const getAssistants = async () => {
  const serverQuery = await gqlServerQuery();
  const payload = await serverQuery<{ getAssistants: AssistantsPayload }>(
    getAssistantsSchema
  );
  return payload?.data?.getAssistants;
};
export default async function Assistant() {
  // const data = await getAssistants();
  return (
    <main className={styles["Container"]}>
      <SettingsArea />
      <AssistantArea data={[]} />
      <CreateAssistant />
    </main>
  );
}
