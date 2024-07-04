import { PayloadStatus } from "../common";

export interface AddDocumentInput {
  knowledgeVault: string;
  fileName: string;
}
export interface Document {
  _id: string;
  newFileName: string;
  originalFileName: string;
  updatedAt: number;
  createdAt: number;
}

export interface KnowledgeVault {
  _id: string;
  name: string;
  documents: Document[];
}

export type KnowledgeVaults = KnowledgeVault[];

export interface DocumentPayload extends PayloadStatus {
  data: Document & { uploadUrl?: string };
}
export interface KnowledgeVaultPayload extends PayloadStatus {
  data: KnowledgeVault;
}

export interface KnowledgeVaultsPayload extends PayloadStatus {
  data: KnowledgeVaults;
}
