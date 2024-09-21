import {UserResponse} from "./user.response";
import {RefreshTokenResponse} from "./refresh.token.response";
import {TokenResponse} from "./token.response";

export interface LoginResponse {
  user: UserResponse;
  refreshToken: RefreshTokenResponse;
  accessToken: TokenResponse;
}
