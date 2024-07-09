"use client";
import { IoFolderOpen, IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { IconAndLabel } from "../../molecules/IconAndText";
import styles from "./index.module.scss";
import { useKnowledgeBase } from "@/app/hooks/knowledgebase";
import { IconType } from "react-icons";
import { KnowledgeVaultsPayload } from "@/types/knowledgebase";
import { useEffect } from "react";
import { Button } from "../../atom/buttons";
import { BasicPopover } from "../popover";

interface KnowledgeBasePanelProps {
  data: KnowledgeVaultsPayload;
}
export const KnowledgeBasePanel: React.FC<KnowledgeBasePanelProps> = ({
  data,
}) => {
  const {
    isOpen,
    knowledgeBase,
    openAndClose,
    selecteKnowledgeBase,
    setKnowledgeBase,
  } = useKnowledgeBase();

  useEffect(() => {
    setKnowledgeBase((prevState) => {
      return {
        ...prevState,
        knowledgeBase: data.data,
        selectedKnowledgeBase: data.data[0],
      };
    });
  }, []);
  return (
    <>
      <div className={styles["Files-Section"]}>
        <div className={styles["FileContainer"]}>
          <div className={styles["Folder"]} onClick={openAndClose}>
            {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
            <IconAndLabel text="All Files" Icon={IoFolderOpen} />
          </div>
          <IoMdAdd onClick={() => ""} />
        </div>

        {isOpen && (
          <div className={styles["DropdownContainer"]}>
            {knowledgeBase.map((item) => (
              <div key={item?._id} onClick={() => selecteKnowledgeBase(item?._id)}>
                <IconAndLabel text={item?.name} Icon={IoFolderOpen} />
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
      {selectedKnowledgeBase?._id && (
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
      <BasicPopover
        ButtonComponent={Settings}
        PopUpContent={<DeleteKnowledgbase />}
      />
    </div>
  );
};

interface SettingsPrps {
  onClick: (event: any) => void;
}
const Settings: React.FC<SettingsPrps> = ({ onClick }) => {
  return (
    <button className={styles["BtnWrapper"]} onClick={onClick}>
      <IoSettingsOutline className={styles["Icon"]} />
    </button>
  );
};

const DeleteKnowledgbase = () => {
  const { deleteKnowledgeBase, isDisabled } = useKnowledgeBase();
  return (
    <div className={styles["DeleteBtnComponentWrapper"]}>
      <Button
        variant="plain"
        isDisabled={isDisabled}
        handler={deleteKnowledgeBase}
      >
        delete
      </Button>
    </div>
  );
};

export const AddFolder = () => {
  const { addKnowledgeVault, isDisabled } = useKnowledgeBase();
  return (
    <>
      <Button handler={addKnowledgeVault} isDisabled={isDisabled}>
        add folder
      </Button>
    </>
  );
};
