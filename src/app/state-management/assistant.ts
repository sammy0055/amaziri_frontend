import { v4 } from "uuid";
import { atom, useRecoilState } from "recoil";
import { AssistantInput } from "@/types/assistant";

const createAssistant = atom<AssistantInput>({
  key: v4(),
  default: {
    name: "",
    description: "",
    type: "",
    brandVoice: "",
    knowledgeVault: [""],
    instructions: [""],
  },
});

export const useCreateAssistantState = () => useRecoilState(createAssistant);
