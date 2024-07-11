import { v4 } from "uuid";
import { atom, useRecoilState } from "recoil";
import { Assistant, AssistantChat, AssistantInput } from "@/types/assistant";

const createAssistant = atom<AssistantInput>({
  key: v4(),
  default: {
    name: "",
    description: "",
    type: "NONE",
    brandVoice: "",
    knowledgeVault: [],
    instructions: [],
  },
});

const assistantChat = atom<AssistantChat>({
  key: v4(),
  default: {
    _id: "",
    queryText: "",
    allChats: [],
  },
});

const asisstants = atom<Assistant[]>({
  key: v4(),
  default: [],
});

export const useCreateAssistantState = () => useRecoilState(createAssistant);
export const useAssistantChatState = () => useRecoilState(assistantChat);
export const useAssistantState = () => useRecoilState(asisstants);
