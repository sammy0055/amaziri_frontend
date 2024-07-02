import { PayloadStatus } from "../common";

export interface Document {
  _id: string;
}

export interface KnowledgeVault {
  _id: string;
  name: string;
  documents: Document[];
}

export type KnowledgeVaults = KnowledgeVault[];

export interface KnowledgeVaultPayload extends PayloadStatus {
  data: KnowledgeVault;
}

export interface KnowledgeVaultsPayload extends PayloadStatus {
  data: KnowledgeVaults;
}
