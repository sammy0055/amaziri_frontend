import {
  addDocumentToKnowledgeBase,
  addDocumentToVectorStore,
  addKnowledgeBase,
  removeDocument,
  removeKnowledgeBase,
  updateKnowledgeBase,
} from "@/app/server_actions/knowledgebase";
import { useKnowledgeBaseState } from "@/app/state-management/knowledge-base";
import { ChangeEvent, useState } from "react";
import { useErrorHandler } from "../common/error";
import debounce from "debounce";

export const useKnowledgeBase = () => {
  const [isOpen, setIsopen] = useState(true);
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
            documents: [],
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

  //---------------------- document area -----------------------

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        setIsDisabled(true);
        const file = event.target.files[0];

        const data = {
          knowledgeVault: selectedKnowledgeBase._id,
          fileName: file.name,
        };

        const payload = await addDocumentToKnowledgeBase(data);
        // console.log(payload?.data);
        const res = await fetch(payload?.data?.uploadUrl!, {
          method: "PUT",
          body: file,
          headers: {
            documentId: payload?.data._id!,
          },
        });

        if (!res.ok) throw res.statusText;
        // await addDocumentToVectorStore({
        //   _id: payload?.data._id!,
        //   fileName: payload?.data.newFileName!,
        // });
        setIsDisabled(false);
        setKnowledgeBase((prevState) => {
          return {
            ...prevState,
            knowledgeBase: prevState.knowledgeBase.map((item) => {
              if (item._id === selectedKnowledgeBase._id) {
                return {
                  ...item,
                  documents: [...item.documents, payload?.data!],
                };
              }
              return item;
            }),
            selectedKnowledgeBase: {
              ...prevState.selectedKnowledgeBase,
              documents: [
                ...prevState.selectedKnowledgeBase.documents,
                payload?.data!,
              ],
            },
          };
        });
      }
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  const deleteDocument = async (_id: string) => {
    setIsDisabled(true);

    const newDocuments = selectedKnowledgeBase.documents.filter(
      (item) => item._id !== _id
    );
    try {
      await removeDocument(_id);
      setKnowledgeBase((prevState) => {
        return {
          ...prevState,
          knowledgeBase: prevState.knowledgeBase.map((item) => {
            if (item._id === selectedKnowledgeBase._id) {
              return {
                ...item,
                documents: newDocuments,
              };
            }
            return item;
          }),
          selectedKnowledgeBase: {
            ...prevState.selectedKnowledgeBase,
            documents: newDocuments,
          },
        };
      });
      setIsDisabled(false);
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
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
    handleFileChange,
    deleteDocument,
  };
};
