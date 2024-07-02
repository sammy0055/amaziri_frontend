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

export const DocumentArea = () => {
  const isDocumentEmpty = false;
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
        <div>
          <h1>{title}</h1>
          <IconLabel text={text} />
        </div>
        <IconWrapper Icon={GrNext} />
      </div>
    </div>
  );
};

const Document = () => {
  return (
    <div>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Name</th>
            <th>Created</th>
            <th>Last</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <DocumentBody
            originalName="computer science"
            createdAt="3 days ago"
            updateAt="2 minutes ago"
          />
        </tbody>
      </Table>
    </div>
  );
};

interface DocumentBodyProps {
  originalName: string;
  createdAt: string;
  updateAt: string;
}

const DocumentBody: React.FC<DocumentBodyProps> = ({
  originalName,
  createdAt,
  updateAt,
}) => {
  return (
    <tr>
      <td>
        <IconAndLabel text={originalName} Icon={FaFilePdf} />
      </td>
      <td>{createdAt}</td>
      <td>{updateAt}</td>
      <td>
        <BasicPopover
          ButtonComponent={Settings}
          PopUpContent={<div>hello</div>}
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
