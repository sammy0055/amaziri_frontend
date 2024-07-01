import { useKnowledgeBaseState } from "@/app/state-management/knowledge-base";
import { ChangeEvent, useState } from "react";

export const useKnowledgeBase = () => {
  const [isOpen, setIsopen] = useState(false);
  const [{ knowledgeBase, selectedKnowledgeBase }, setKnowledgeBase] =
    useKnowledgeBaseState();

  const openAndClose = () => setIsopen(!isOpen);

  const addKnowledgeBase = (name: string) => {
    knowledgeBase.push({ _id: Math.random().toString(), name });
  };

  const selecteKnowledgeBase = (id: string) => {
    const file = knowledgeBase.find(({ _id }) => _id === id)!;
    setKnowledgeBase((prevState) => {
      return {
        ...prevState,
        selectedKnowledgeBase: file,
      };
    });
  };

  const handleKnowledgeBaseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKnowledgeBase((prevState) => {
      return {
        ...prevState,
        selectedKnowledgeBase: {
          ...prevState.selectedKnowledgeBase,
          name: e.target.value,
        },
      };
    });
  };

  return {
    isOpen,
    knowledgeBase,
    selectedKnowledgeBase,
    setKnowledgeBase,
    openAndClose,
    addKnowledgeBase,
    selecteKnowledgeBase,
    handleKnowledgeBaseChange,
  };
};
