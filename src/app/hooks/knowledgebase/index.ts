import { useKnowledgeBaseState } from "@/app/state-management/knowledge-base";
import { useState } from "react";

export const useKnowledgeBase = () => {
  const [isOpen, setIsopen] = useState(false);
  const [{ knowledgeBase, selectedKnowledgeBase }, setKnowledgeBase] =
    useKnowledgeBaseState();

  const openAndClose = () => setIsopen(!isOpen);

  const addKnowledgeBase = (name: string) => {
    knowledgeBase.push({ _id: Math.random().toString(), name });
  };

  const selecteKnowledgeBase = (id: string) => {
    setKnowledgeBase((prevState) => {
      return {
        ...prevState,
        selectedKnowledgeBase: knowledgeBase.find(({ _id }) => _id === id)!,
      };
    });
  };

  return {
    isOpen,
    knowledgeBase,
    selectedKnowledgeBase,
    openAndClose,
    addKnowledgeBase,
    selecteKnowledgeBase,
  };
};
