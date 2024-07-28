import { PayloadStatus } from "../common";

export interface WorkflowPayload extends PayloadStatus {
    data: string
}