import {ApiUser} from "./api-user";

export interface ApiPunishment {
  Id: string,
  Recipient: ApiUser,
  Reason: string,
  Revoked: boolean,
  Author: ApiUser,
  CreationDate: number,
  ModificationDate: number,
  ExpiryDate: number,
  RevokeDate: number | null;
}
