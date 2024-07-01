export interface Document {
  _id: string;
}

export interface KnowledgeVault {
  _id: string;
  name: string;
  documents: Document[];
}

export type KnowledgeVaults = KnowledgeVault[];

export interface KnowledgeVaultsPayload {
  code: string;
  message: string;
  data: KnowledgeVaults;
}
