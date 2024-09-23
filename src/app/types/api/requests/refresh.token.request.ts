import {IApiRequest} from "./iapi.request";

export interface RefreshTokenRequest extends IApiRequest {
  refreshTokenId: string;
}
