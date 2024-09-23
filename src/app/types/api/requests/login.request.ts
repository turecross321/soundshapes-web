import {IApiRequest} from "./iapi.request";

export interface LoginRequest extends IApiRequest {
  email: string;
  passwordSha512: string;
}
