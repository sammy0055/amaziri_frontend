import {
  addKnowledgeBase,
  removeKnowledgeBase,
  updateKnowledgeBase,
} from "@/app/server_actions/knowledgebase";
import { useKnowledgeBaseState } from "@/app/state-management/knowledge-base";
import { ChangeEvent, useState } from "react";
import { useErrorHandler } from "../common/error";
import debounce from "debounce";

export const useKnowledgeBase = () => {
  const [isOpen, setIsopen] = useState(false);
  const [{ knowledgeBase, selectedKnowledgeBase }, setKnowledgeBase] =
    useKnowledgeBaseState();

  const [isDisabled, setIsDisabled] = useState(false);
  const { handleError } = useErrorHandler();

  const openAndClose = () => setIsopen(!isOpen);

  const addKnowledgeVault = async () => {
    setIsDisabled(true);
    try {
      const data = await addKnowledgeBase({
        name: "new folder",
      });
      setIsDisabled(false);
      const newFolder = data?.data!;
      setKnowledgeBase((prevState) => {
        return {
          ...prevState,
          knowledgeBase: [...prevState.knowledgeBase, newFolder],
          selectedKnowledgeBase: newFolder,
        };
      });
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  const updateKnowledgeVault = async (_data: { _id: string; name: string }) => {
    setIsDisabled(true);
    try {
      const data = await updateKnowledgeBase(_data);
      setIsDisabled(false);
      const newFolder = data?.data!;

      setKnowledgeBase((prevState) => {
        return {
          ...prevState,
          knowledgeBase: prevState.knowledgeBase.map((item) =>
            item._id === newFolder._id ? newFolder : item
          ),
        };
      });
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  const deleteKnowledgeBase = async () => {
    const _id = selectedKnowledgeBase._id;
    setIsDisabled(true);
    try {
      await removeKnowledgeBase({ _id });
      setIsDisabled(false);
      setKnowledgeBase((prevState) => {
        return {
          ...prevState,
          knowledgeBase: prevState.knowledgeBase.filter(
            (item) => item._id !== _id
          ),
          selectedKnowledgeBase: prevState.knowledgeBase[0] || {
            _id: "",
            name: "",
          },
        };
      });
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
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

    const debounceUpdate = debounce(async () => {
      await updateKnowledgeVault({
        _id: selectedKnowledgeBase._id,
        name: e.target.value,
      });
    }, 2000);

    debounceUpdate();
  };

  return {
    isOpen,
    isDisabled,
    knowledgeBase,
    selectedKnowledgeBase,
    setKnowledgeBase,
    openAndClose,
    addKnowledgeVault,
    updateKnowledgeVault,
    selecteKnowledgeBase,
    handleKnowledgeBaseChange,
    deleteKnowledgeBase,
  };
};
