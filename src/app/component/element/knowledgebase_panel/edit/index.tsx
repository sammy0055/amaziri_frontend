"use client";
import styles from "./index.module.scss";
import Button from "@mui/joy/Button";
import { useEffect, useRef, useState } from "react";
import { CircularProgress, Divider } from "@mui/joy";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdOutlineExpandMore, MdOutlineNavigateNext } from "react-icons/md";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { useKnowledgeBase } from "@/app/hooks/knowledgebase";
import { Document } from "@/types/knowledgebase";
import { useAssistant } from "@/app/hooks/assistant";
import { IconBtnWrapper } from "@/app/component/atom/buttons";

export const KnowledgeBaseArea = () => {
  return (
    <div className={styles["KnowledgeBaseWrapper"]}>
      <div>
        <Button variant="plain" style={{ borderRadius: "0px" }}>
          All Files
        </Button>
        <Divider />
      </div>
      <div className={styles["KnowledgeBaseAreaContent"]}>
        <KnowledgeBaseAreaContent />
      </div>
    </div>
  );
};

const KnowledgeBaseAreaContent = () => {
  const { knowledgeBase, isDisabled, getKnowledgeVaults } =
    useKnowledgeBase();

  useEffect(() => {
    const getData = async () => {
      await getKnowledgeVaults();
    };
    getData();
  }, []);

  interface ContentProps {
    _id: string;
    name: string;
    documents: Document[];
  }
  const Content: React.FC<ContentProps> = ({ name, documents, _id }) => {
    const {
      isDisabled: AssistantIsDisabled,
      assistantInputData,
      handleSelectKnowledgeBase,
      handleFileChangeInput,
    } = useAssistant();
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const isSelected = assistantInputData.knowledgeVault.includes(_id);

    const handleSelect = () => {
      handleSelectKnowledgeBase(_id);
    };

    const addDocumentInput = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const AdocumentIcons = () => {
      return (
        <>
          {!AssistantIsDisabled ? (
            <IconBtnWrapper>
              <FaPlus size={20} onClick={addDocumentInput} />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChangeInput(e, _id)}
                className={styles["FileInput"]}
              />
            </IconBtnWrapper>
          ) : (
            <CircularProgress />
          )}
        </>
      );
    };

    return (
      <div
        className={`${styles["Content"]} ${isSelected && styles["Selected"]}`}
      >
        <div>
          <div className={styles["IconContainer"]}>
            {open ? (
              <MdOutlineExpandMore size={30} onClick={() => setOpen(!open)} />
            ) : (
              <MdOutlineNavigateNext size={30} onClick={() => setOpen(!open)} />
            )}
            <div className={styles["IconWrapper"]} onClick={handleSelect}>
              <FaRegFolderOpen size={20} />
              <span>{name}</span>
            </div>
          </div>
          <div className={styles["DocumentArea"]}>
            {open &&
              documents?.map((document) => {
                return (
                  <div key={document?._id} className={styles["IconWrapper"]}>
                    <BsFileEarmarkPdf size={20} />
                    <span>{document?.originalFileName}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles["Selected-IconWrapper"]}>
          {isSelected && <AdocumentIcons />}
          {isSelected && <FaCheck size={20} />}
        </div>
      </div>
    );
  };

  const isknowledgeBaseEmpty = knowledgeBase.length !== 0;
  return (
    <div>
      {isknowledgeBaseEmpty ? (
        knowledgeBase?.map((item) => {
          return (
            <Content
              key={item?._id}
              _id={item?._id}
              name={item?.name}
              documents={item?.documents}
            />
          );
        })
      ) : (
        <div>
          {!isDisabled ? <KnowledgeBaseEmptyDisplay /> : <h1>loading</h1>}
        </div>
      )}
    </div>
  );
};

const KnowledgeBaseEmptyDisplay = () => {
  const { isDisabled, addKnowledgeVault } = useKnowledgeBase();
  const { assistantInputData } = useAssistant();
  const addKnowledgeVaultInput = () => {
    addKnowledgeVault(assistantInputData?.name);
  };
  return (
    <div className={styles["KnowledgeBaseEmptyDisplay"]}>
      <p>knowledgebase is empty. add knowledgebase</p>
      <Button
        onClick={addKnowledgeVaultInput}
        loading={isDisabled}
        disabled={isDisabled}
      >
        add knowledgebase
      </Button>
    </div>
  );
};
