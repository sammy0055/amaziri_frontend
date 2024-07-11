"use client";
import { Option, Select } from "@mui/joy";
import { InputArea, MessageContainer } from "../../element/chat";
import styles from "./index.module.scss";
import { Heading } from "../../atom/headings";
import { Assistant } from "@/types/assistant";
import { useAssistant } from "@/app/hooks/assistant";
import { useEffect } from "react";

interface ChatAreaWrapperProps {
  data: Assistant[];
}
export const ChatAreaWrapper: React.FC<ChatAreaWrapperProps> = ({ data }) => {
  const { selectChatAssistant, setAssistantChatData } = useAssistant();

  const handleSelectChange = (e: any, newValue: any) => {
    selectChatAssistant(newValue);
  };

  useEffect(() => {
    setAssistantChatData({
      _id: data[0]?._id || "",
      queryText: "",
      allChats: [],
    });
  }, [data]);

  return (
    <div className={styles["ChatContainer"]}>
      <div className={styles["ChooseAssistat"]}>
        <Heading customStyles={styles["CustomHeadingStyles"]}>
          Choose Your Assistant
        </Heading>
        <Select
          placeholder={data[0]?.name}
          className={styles["SelectWrapper"]}
          defaultValue={data[0]?._id}
          onChange={handleSelectChange}
        >
          {data?.map((item) => {
            return (
              <Option key={item?._id} value={item?._id}>
                {item?.name}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className={styles["MessagesArea"]}>
        <MessageContainer />
      </div>

      <div className={styles["InputAreaContainer"]}>
        <InputArea />
      </div>
    </div>
  );
};
