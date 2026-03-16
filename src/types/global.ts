/* eslint-disable @typescript-eslint/no-explicit-any */

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T>;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TArgsParam = Record<string, any>;

export interface ErrorSource {
  path: string;
  message: string;
}

export interface ErrorResponseData {
  status: boolean;
  message: string;
  errorSources: ErrorSource[];
  stack?: string;
}

export interface ErrorResponse {
  data: ErrorResponseData;
  status: boolean;
}

export type IImagePlatform = "imgbb" | "cloudinary" | "server" | "aws" | string;
export const I_IMAGE_PLATFORM_ARRAY = ["imgbb", "cloudinary", "server", "aws"];

export interface TFileDocument {
  id: string;
  filename: string;
  mimeType: string;
  extension: string;
  checksum: string;
  size: number;
  file_type: string;
  path?: string | null;
  url: string;
  provider: string;
  visibility: "public" | "private";

  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserType = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "USER" | "CUSTOMER";
