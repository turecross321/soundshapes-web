import {ApiToken} from "../api-token";
import {ApiUser} from "../api-user";
import {ApiPunishment} from "../api-punishment";

export interface ApiLoginResponse {
  AccessToken: ApiToken,
  RefreshToken: ApiToken,
  User: ApiUser,
  ActivePunishments: ApiPunishment[]
}
