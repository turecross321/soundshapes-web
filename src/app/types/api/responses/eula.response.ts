import {IApiResponse} from "./iapi.response";

export interface EulaResponse extends IApiResponse {
  customText: string;
  license: string;
  repositoryUrl: string;
}
