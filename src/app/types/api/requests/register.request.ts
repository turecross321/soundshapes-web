import {IApiRequest} from "./iapi.request";

export interface RegisterRequest extends IApiRequest {
  code: string;
  email: string;
  passwordSha512: string;
  acceptEula: boolean;
}
