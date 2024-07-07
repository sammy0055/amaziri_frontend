export interface PayloadStatus {
  code: string;
  message: string;
}

export interface PageQeuryParams {
  params: any;
  searchParams: {
    state: string;
    code: string;
    error: string;
  };
}

export interface ProfilePayload {
  success: boolean;
  message: string;
  data: {
    organizations: string | string[];
    email: string;
    firstName: string;
    lastName: string;
  };
}

export enum LocalStorageVariables {
  AMAZIRI_IDTOKEN = "AMAZIRI_IDTOKEN",
}

export type AlertColors =
  | "danger"
  | "neutral"
  | "primary"
  | "success"
  | "warning";

  