"use client";
import { IoFolderOpen } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { IconAndLabel } from "../../molecules/IconAndText";
import styles from "./index.module.scss";
import { useKnowledgeBase } from "@/app/hooks/knowledgebase";
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
            <IconAndLabel text="All Files" icon={<IoFolderOpen />} />
          </div>
          <IoMdAdd onClick={() => addKnowledgeBase} />
        </div>

        {isOpen && (
          <div className={styles["DropdownContainer"]}>
            {knowledgeBase.map(({ name, _id }) => (
              <div key={_id} onClick={() => selecteKnowledgeBase(_id)}>
                <IconAndLabel text={name} icon={<IoFolderOpen />} />
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
        <IconAndLabel
          text={selectedKnowledgeBase.name}
          icon={<IoFolderOpen />}
        />
      )}
    </div>
  );
};
