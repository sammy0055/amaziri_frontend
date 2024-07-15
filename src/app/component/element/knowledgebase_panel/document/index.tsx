"use client";
import { IoDocumentText } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import { FaLink, FaFilePdf } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import styles from "./document.module.scss";
import { IconLabel } from "@/app/component/atom/typography";
import { IconWrapper } from "@/app/component/atom/icons";
import Table from "@mui/joy/Table";
import { IconAndLabel } from "@/app/component/molecules/IconAndText";
import { BasicPopover } from "../../popover";
import { useKnowledgeBase } from "@/app/hooks/knowledgebase";

import { formatDistanceToNow } from "date-fns";
import { Button } from "@/app/component/atom/buttons";

export const DocumentArea = () => {
  const { selectedKnowledgeBase } = useKnowledgeBase();
  const isDocumentEmpty = selectedKnowledgeBase?.documents.length === 0;
  return <div>{isDocumentEmpty ? <AddDocumentWrapper /> : <Document />}</div>;
};

const AddDocumentWrapper = () => {
  return (
    <>
      <AddDocumentComponent
        icon={<IoDocumentText size={30} />}
        title="Upload Document"
        text="Upload .pdfs, .doc/docx, .ppt/pptx, .xlsx/xls files"
      />
      <AddDocumentComponent
        icon={<FaLink size={30} />}
        title="Import A Website"
        text="Import a website to your knowledge base"
      />
    </>
  );
};

interface AddDocumentCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}
const AddDocumentComponent: React.FC<AddDocumentCardProps> = ({
  icon,
  title,
  text,
}) => {
  return (
    <div className={styles["AddDocumentCardWrapper"]}>
      <div className={styles["AddDocumentCard"]}>
        <div className={styles["IconWrapper"]}>{icon}</div>
        <div className={styles["Text"]}>
          <h1>{title}</h1>
          <IconLabel text={text} />
        </div>
        <IconWrapper Icon={GrNext} />
      </div>
    </div>
  );
};

const Document = () => {
  const { selectedKnowledgeBase } = useKnowledgeBase();
  const isMoble = window.innerWidth < 450;
  return (
    <div>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th className={styles["TableName"]}>Name</th>
            {!isMoble && <th>Created</th>}
            {!isMoble && <th>Last</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {selectedKnowledgeBase?.documents?.map((document) => {
            return (
              <DocumentBody
                key={document._id}
                _id={document._id}
                originalName={document.originalFileName}
                createdAt={document.createdAt}
                updateAt={document.updatedAt}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

interface DocumentBodyProps {
  _id: string;
  originalName: string;
  createdAt: number;
  updateAt: number;
}

const DocumentBody: React.FC<DocumentBodyProps> = ({
  _id,
  originalName,
  createdAt,
  updateAt,
}) => {
  const { deleteDocument, isDisabled } = useKnowledgeBase();
  const isMoble = window.innerWidth > 450;
  return (
    <tr>
      <td>
        <IconAndLabel text={originalName} Icon={FaFilePdf} />
      </td>
      {isMoble && (
        <td>
          {createdAt ? formatDistanceToNow(createdAt, { addSuffix: true }) : ""}
        </td>
      )}
      {isMoble && (
        <td>
          {updateAt ? formatDistanceToNow(updateAt, { addSuffix: true }) : ""}
        </td>
      )}
      <td>
        <BasicPopover
          ButtonComponent={Settings}
          PopUpContent={
            <Button
              isDisabled={isDisabled}
              handler={async () => await deleteDocument(_id)}
            >
              delete
            </Button>
          }
        />
      </td>
    </tr>
  );
};

interface SettingsProps {
  onClick: (event: any) => void;
}
const Settings: React.FC<SettingsProps> = ({ onClick }) => {
  return <IoIosMore size={20} onClick={onClick} />;
};
