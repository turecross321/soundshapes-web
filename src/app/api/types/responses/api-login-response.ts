import {ApiToken} from "../api-token";
import {ApiUser} from "../api-user";
import {ApiPunishment} from "../api-punishment";

export interface ApiLoginResponse {
    accessToken: ApiToken,
    refreshToken: ApiToken,
    user: ApiUser,
    activePunishments: ApiPunishment[]
}
