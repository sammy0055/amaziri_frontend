import {
  EditAssistantContentArea,
  EditAssistantSettingsArea,
} from "@/app/component/modules/assistant/editAssistant";

export default function EditAssistant() {
  return (
    <main>
      <EditAssistantSettingsArea />
      <EditAssistantContentArea />
    </main>
  );
}
