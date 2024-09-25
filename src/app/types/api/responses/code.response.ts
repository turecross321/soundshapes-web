import {CodeType} from "../enums/code.type";
import {UserResponse} from "./user.response";
import {IApiResponse} from "./iapi.response";
import {PlatformType} from "../enums/platform.type";

export interface CodeResponse extends IApiResponse {
  code: string;
  user: UserResponse;
  creationDate: string;
  expiryDate: string;
  codeType: CodeType;
  genuineNpTicket: boolean | null;
  platform: PlatformType | null;
}
