"use client";
import { Heading, LabelParagraph } from "../../atom/headings";
import { IoPersonCircleOutline } from "react-icons/io5";
import { GoWorkflow } from "react-icons/go";
import { TextArea } from "../../atom/input";
import styles from "./index.module.scss";
import { useAssistant } from "@/app/hooks/assistant";
import { FaArrowUp, FaUser } from "react-icons/fa";
import { FcAssistant } from "react-icons/fc";
import { CircularProgress } from "@mui/joy";
export const MessageContainer = () => {
  const { assistantChatData } = useAssistant();

  const isMessages = assistantChatData?.allChats?.length;
  return (
    <div className={styles["MessageContainer"]}>
      {isMessages ? (
        assistantChatData?.allChats?.map((item, index) => {
          return (
            <ChatMessageDisplay
              key={index}
              queryText={item?.queryText!}
              systemResponse={item?.systemResponse!}
            />
          );
        })
      ) : (
        <EmptyChatDisplay />
      )}
    </div>
  );
};

export const InputArea = () => {
  const {
    isDisabled,
    isChatBtnActive,
    assistantChatData,
    handleAssistantChatInputChange,
    handleSubmitAssistantChatData,
  } = useAssistant();
  return (
    <div className={styles["InputArea"]}>
      <TextArea
        name="queryText"
        type="text"
        value={assistantChatData?.queryText || ""}
        customStyles={styles["TextAreaStyle"]}
        handleChange={handleAssistantChatInputChange}
        handleKeyDown={handleSubmitAssistantChatData}
      />
      <button
        className={`${styles["IconWrapper"]} ${
          !isChatBtnActive && styles["BtnDisabled"]
        }`}
      >
        {isDisabled ? <CircularProgress /> : <FaArrowUp size={30} />}
      </button>
    </div>
  );
};

const EmptyChatDisplay = () => {
  return (
    <div className={styles["EmptyChatContainer"]}>
      <div>
        <div className={styles["EmptyChatWrapper"]}>
          <IoPersonCircleOutline size={30} />
          <div>
            <Heading>Assistants</Heading>
            <LabelParagraph>
              Chat with AI Assistants that have the context of your business and
              are customized for specific tasks.
            </LabelParagraph>
          </div>
        </div>

        <div className={styles["EmptyChatWrapper"]}>
          <GoWorkflow size={30} />
          <div>
            <Heading>Workflows</Heading>
            <LabelParagraph>
              Run AI Workflows to automate complex tasks across your tools and
              systems.
            </LabelParagraph>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChatMessageDisplayProps {
  queryText: string;
  systemResponse: string;
}

const ChatMessageDisplay: React.FC<ChatMessageDisplayProps> = ({
  queryText,
  systemResponse,
}) => {
  return (
    <div>
      {queryText && <UserMessageDisplay text={queryText} />}
      {systemResponse && <AssistantMessageDisplay text={systemResponse} />}
    </div>
  );
};

interface ChatMessageContainerProps {
  text: string;
}
const UserMessageDisplay: React.FC<ChatMessageContainerProps> = ({ text }) => {
  return (
    <div className={styles["UserMessageDisplayContainer"]}>
      <FaUser className={styles["AssistantMessageDisplayIcon"]} />
      <p className={styles["UserMessageDisplay"]}>{text}</p>
    </div>
  );
};
const AssistantMessageDisplay: React.FC<ChatMessageContainerProps> = ({
  text,
}) => {
  return (
    <div className={styles["AssistantMessageDisplayContainer"]}>
      <FcAssistant className={styles["AssistantMessageDisplayIcon"]} />
      <p className={styles["AssistantMessageDisplay"]}>{text}</p>
    </div>
  );
};
