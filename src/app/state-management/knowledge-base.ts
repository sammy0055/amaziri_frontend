import { v4 } from "uuid";
import { atom, useRecoilState } from "recoil";
import { KnowledgeVault, KnowledgeVaults } from "@/types/knowledgebase";

const date = Date.now();
const knowledgebase = atom<{
  knowledgeBase: KnowledgeVaults;
  selectedKnowledgeBase: KnowledgeVault;
}>({
  key: v4(),
  default: {
    knowledgeBase: [
      { _id: "1", name: "general", documents: [] },
      {
        _id: "2",
        name: "marketing assistant",
        documents: [],
      },
    ],
    selectedKnowledgeBase: {
      _id: "",
      name: "",
      documents: [],
    },
  },
});

export const useKnowledgeBaseState = () => useRecoilState(knowledgebase);
