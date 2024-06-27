import { v4 } from "uuid";
import { atom, useRecoilState } from "recoil";

const knowledgebase = atom({
  key: v4(),
  default: {
    knowledgeBase: [
      { _id: "1", name: "general" },
      { _id: "2", name: "marketing assistant" },
    ],
    selectedKnowledgeBase: { _id: "", name: "" },
  },
});

export const useKnowledgeBaseState = () => useRecoilState(knowledgebase);
