import {CodeType} from "../enums/code.type";
import {UserResponse} from "./user.response";
import {IApiResponse} from "./iapi.response";

export interface CodeResponse extends IApiResponse {
  code: string;
  user: UserResponse;
  creationDate: Date;
  expiryDate: Date;
  codeType: CodeType
}
