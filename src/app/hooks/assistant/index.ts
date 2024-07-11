import {
  useAssistantChatState,
  useAssistantState,
  useCreateAssistantState,
} from "@/app/state-management/assistant";
import { useOpenAndClosePopUp } from "@/app/state-management/utility-state";
import { ChangeEvent, useState } from "react";
import { useAlertHandler } from "../common/alert";
import { useGqlApiCall } from "../gqlApiCall";
import { addDocumentToKnowledgeBase } from "@/app/server_actions/knowledgebase";
import { useKnowledgeBaseState } from "@/app/state-management/knowledge-base";
import { useErrorHandler } from "../common/error";
import { createAssistant, editAssistant } from "@/app/server_actions/assistant";

export const useAssistant = () => {
  const [open, setOpen] = useOpenAndClosePopUp();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isChatBtnActive, setIsChatBtnActive] = useState(false);
  const { handleAlertMessage } = useAlertHandler();
  const { handleError } = useErrorHandler();
  const gqlApiCall = useGqlApiCall();
  const [assistantInputData, setAssistantInputData] = useCreateAssistantState();
  const [assistantChatData, setAssistantChatData] = useAssistantChatState();
  const [assistantData, setAssistantData] = useAssistantState();
  const [_, setKnowledgeBase] = useKnowledgeBaseState();

  const startCreateAssistantProcess = () => setOpen(true);

  const handleAssistantChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "instructions")
      setAssistantInputData((prevState) => ({ ...prevState, [name]: [value] }));
    if (name !== "instructions")
      setAssistantInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const selectAssistantType = (type: "Q&A" | "NONE") => {
    setAssistantInputData((prevState) => {
      return { ...prevState, type: type };
    });
  };

  const validateRequiredFields = () => {
    if (!assistantInputData.name) {
      handleAlertMessage("name field most not be empty", "warning");
      return false;
    } else if (!assistantInputData.description) {
      handleAlertMessage("description field most not be empty", "warning");
      return false;
    }
    return true;
  };

  const handleSelectKnowledgeBase = async (_id: string) => {
    const isSelected = assistantInputData.knowledgeVault.includes(_id);
    if (isSelected) {
      const newArray = assistantInputData?.knowledgeVault?.filter(
        (item) => item !== _id
      );

      setAssistantInputData((prevState) => {
        return {
          ...prevState,
          knowledgeVault: newArray,
        };
      });
    } else {
      setAssistantInputData((prevState) => {
        return {
          ...prevState,
          knowledgeVault: [...prevState.knowledgeVault, _id],
        };
      });
    }
  };

  const handleFileChangeInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
    _id: string
  ) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        setIsDisabled(true);
        const file = event.target.files[0];

        const data = {
          knowledgeVault: _id,
          fileName: file.name,
        };

        const payload = await gqlApiCall(async (token) => {
          return await addDocumentToKnowledgeBase(data, token);
        });
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
              if (item._id === _id) {
                return {
                  ...item,
                  documents: [...item.documents, payload?.data!],
                };
              }
              return item;
            }),
          };
        });
      }
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  const submitCreateAssistantData = async () => {
    setIsDisabled(true);
    try {
      const data = await gqlApiCall(async (token) => {
        return await createAssistant(assistantInputData, token);
      });
      setIsDisabled(false);
      setAssistantInputData({
        name: "",
        description: "",
        brandVoice: "",
        type: "NONE",
        instructions: [],
        knowledgeVault: [],
      });

      setAssistantData((prevState) => {
        return [...prevState, data?.data!];
      });

      setOpen(false);
      return false;
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  const submitEditAssistantData = async () => {
    setIsDisabled(true);
    try {
      const data = await gqlApiCall(async (token) => {
        return await editAssistant(assistantInputData as any, token);
      });
      setIsDisabled(false);
      setAssistantInputData({
        name: "",
        description: "",
        brandVoice: "",
        type: "NONE",
        instructions: [],
        knowledgeVault: [],
      });

      const updatedAssistantData = assistantData?.map((item) => {
        if (item._id === data?.data?._id) return data?.data!;
        return item;
      });
      setAssistantData(updatedAssistantData);
      setOpen(false);
      return true;
    } catch (error: any) {
      setIsDisabled(false);
      handleError(error);
    }
  };

  const handleSetAssistantEditData = (_id: string) => {
    const editData = assistantData.find((item) => item._id === _id);
    const newData = JSON.parse(JSON.stringify(editData));
    if (newData?.__typename) delete newData.__typename;
    if (editData) setAssistantInputData(newData);
  };

  const selectChatAssistant = (_id: string) => {
    setAssistantChatData((prevState) => {
      return { ...prevState, _id: _id };
    });
    btnState();
  };

  const btnState = () => {
    const { queryText } = assistantChatData;
    const isInvalidQueryText = !queryText || queryText.length <= 1;
    const isId = assistantChatData._id;

    if (!isInvalidQueryText && isId) setIsChatBtnActive(true);
    else setIsChatBtnActive(false);
  };

  const handleAssistantChatInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAssistantChatData((prevState) => {
      return { ...prevState, queryText: value };
    });

    btnState();
  };

  const handleSubmitAssistantChatData = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (e.shiftKey) return;

      e.preventDefault(); // Prevents the default action of adding a new line
      setIsChatBtnActive(false);
      setIsDisabled(true)
      setAssistantChatData((prevState) => {
        return {
          ...prevState,
          queryText: "",
          allChats: [
            ...prevState.allChats,
            { queryText: assistantChatData.queryText },
          ],
        };
      });
      // console.log("====================================");
      // console.log(assistantChatData);
      // console.log("====================================");
    }
  };

  return {
    isDisabled,
    isChatBtnActive,
    assistantInputData,
    assistantChatData,
    setAssistantChatData,
    handleAssistantChange,
    startCreateAssistantProcess,
    validateRequiredFields,
    selectAssistantType,
    handleSelectKnowledgeBase,
    handleFileChangeInput,
    submitCreateAssistantData,
    handleSetAssistantEditData,
    submitEditAssistantData,
    selectChatAssistant,
    handleAssistantChatInputChange,
    handleSubmitAssistantChatData,
  };
};
