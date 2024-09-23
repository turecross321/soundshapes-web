import {IApiRequest} from "./iapi.request";

export interface CodeRequest extends IApiRequest {
  code: string;
}
