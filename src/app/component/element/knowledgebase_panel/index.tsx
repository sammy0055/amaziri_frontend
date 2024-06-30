"use client";
import { IoFolderOpen, IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { IconAndLabel } from "../../molecules/IconAndText";
import styles from "./index.module.scss";
import { useKnowledgeBase } from "@/app/hooks/knowledgebase";
import { IconType } from "react-icons";
export const KnowledgeBasePanel = () => {
  const {
    isOpen,
    knowledgeBase,
    openAndClose,
    addKnowledgeBase,
    selecteKnowledgeBase,
  } = useKnowledgeBase();
  return (
    <>
      <div className={styles["Files-Section"]}>
        <div className={styles["FileContainer"]}>
          <div className={styles["Folder"]} onClick={openAndClose}>
            {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
            <IconAndLabel text="All Files" Icon={IoFolderOpen} />
          </div>
          <IoMdAdd onClick={() => addKnowledgeBase} />
        </div>

        {isOpen && (
          <div className={styles["DropdownContainer"]}>
            {knowledgeBase.map(({ name, _id }) => (
              <div key={_id} onClick={() => selecteKnowledgeBase(_id)}>
                <IconAndLabel text={name} Icon={IoFolderOpen} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export const SelecteKnowledgeBaseDisplay = () => {
  const { selectedKnowledgeBase } = useKnowledgeBase();
  return (
    <div>
      {selectedKnowledgeBase?.name && (
        <IconAndText text={selectedKnowledgeBase?.name} Icon={IoFolderOpen} />
      )}
    </div>
  );
};

interface IconAndTextProps {
  Icon: IconType;
  text?: string;
}
const IconAndText: React.FC<IconAndTextProps> = ({ Icon, text }) => {
  const { handleKnowledgeBaseChange } = useKnowledgeBase();
  return (
    <div className={styles["Selected"]}>
      <Icon className={styles["Icon"]} />
      <input
        className={styles["Text"]}
        value={text}
        onChange={handleKnowledgeBaseChange}
      />
      <button className={styles["BtnWrapper"]}>
        <IoSettingsOutline className={styles["Icon"]} />
      </button>
    </div>
  );
};
