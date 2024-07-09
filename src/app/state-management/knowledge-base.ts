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
    knowledgeBase: [],
    selectedKnowledgeBase: {
      _id: "",
      name: "",
      documents: [],
    },
  },
});

export const useKnowledgeBaseState = () => useRecoilState(knowledgebase);
