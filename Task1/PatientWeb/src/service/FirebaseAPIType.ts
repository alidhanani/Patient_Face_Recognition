import { UserCredential } from "firebase/auth";

export type CallbackFunctionLogin = {
  success: boolean;
  userCred?: UserCredential;
  message?: string;
};

export type CallbackFunctionPasswordReset = {
  success: boolean;
  message?: string;
};

export type CallbackFunctionProfile = {
  success: boolean;
  user: Patient;
  message?: string;
};

// Define a type for the file information
export interface FileInfo {
  name: string;
  lastModified: Date;
}

// Define the modified callback function
export interface CallbackFunctionStorageFilename {
  success: boolean;
  filename?: FileInfo[];
  message?: string;
}

export type CallbackFunctionUserExist = {
  exist: boolean;
};

export type CallbackFunctionLogout = {
  success: boolean;
  message?: string;
};

export type CallbackFunctionFileDelete = {
  success: boolean;
  message?: string;
};

export type CallbackFunctionUploadVideo = {
  success: boolean;
  url?: string;
  message?: string;
};

export type CallbackFunctionFileURL = {
  success: boolean;
  url?: string;
  message?: string;
};

export type CallbackFunctionUpdatePatientInfo = {
  success: boolean;
  patient?: {
    username: string;
    createDate: string;
    firstName: string;
    lastName: string;
  };
  message?: string;
};

export type CallbackFunctionFetchPatientList = {
  success: boolean;
  data?: any[];
  message?: string;
};
