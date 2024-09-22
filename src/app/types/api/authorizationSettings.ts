import {IApiResponse} from "./responses/iapi.response";
import {IApiRequest} from "./requests/iapi.request";

export interface AuthorizationSettings extends IApiResponse, IApiRequest {
  rpcnAuthorization: boolean;
  psnAuthorization: boolean;
  ipAuthorization: boolean;
}
