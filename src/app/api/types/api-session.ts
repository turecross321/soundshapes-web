import {ApiUser} from "./api-user";

export interface ApiSession {
  Id: string;
  CreationDate: number;
  ExpiryDate: number;
  User: ApiUser;
}
