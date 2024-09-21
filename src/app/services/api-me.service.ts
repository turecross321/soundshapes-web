import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {UserResponse} from "../types/api/responses/user.response";
import {RefreshTokenResponse} from "../types/api/responses/refresh.token.response";
import {TokenResponse} from "../types/api/responses/token.response";
import {LoginResponse} from "../types/api/responses/login.response";
import {ToastService} from "./toast.service";
import {ApiClientService} from "./api-client.service";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ApiMeService {

  private user: UserResponse | null = null;
  private accessToken: TokenResponse | null = null;
  private refreshToken: RefreshTokenResponse | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private toast: ToastService, private apiClient: ApiClientService) {
    if (isPlatformBrowser(platformId)) {
      apiClient.onLogin.subscribe((response) => this.onLogin(response));
    }
  }

  public getUser(): UserResponse | null {
    return this.user;
  }

  public loggedIn(): boolean {
    return (this.user != null) && (this.accessToken != null);
  }

  public getAccessToken(): TokenResponse | null {
    // if we have an access token but its expired
    if (this.accessToken && this.accessToken?.expiryDate < new Date()) {
      const refreshToken: RefreshTokenResponse | null = this.getRefreshToken();

      // if we still have a refresh token, attempt to get a new access token
      if (refreshToken) {
        this.apiClient.logInWithRefreshToken({refreshTokenId: refreshToken.id})
          .subscribe((response: LoginResponse) => {
            return response.accessToken;
          });
      }
      // otherwise, give up
      else {
        this.accessToken = null;
        this.user = null;
      }
    }

    return this.accessToken;
  }

  public getRefreshToken(): RefreshTokenResponse | null {
    // if it's expired, remove it
    if (this.refreshToken && this.refreshToken.expiryDate < new Date()) {
      this.refreshToken = null;
      return null;
    }

    return this.refreshToken;
  }

  public onLogin(response: LoginResponse) {
    this.user = response.user;
    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;

    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("refreshToken", JSON.stringify(response.refreshToken));
    localStorage.setItem("accessToken", JSON.stringify(response.accessToken));

    this.toast.success("Welcome", `Successfully logged in as ${response.user.name}`);
  }

  public loadFromStorage() {
    try {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        this.user = JSON.parse(userJson);
      }

      const refreshJson = localStorage.getItem("refreshToken");
      if (refreshJson) {
        this.refreshToken = JSON.parse(refreshJson);
      }

      const accessJson = localStorage.getItem("accessToken");
      if (accessJson) {
        this.accessToken = JSON.parse(accessJson);
      }
    } catch (e) {
      this.toast.warn("Bad cache data", "Unable to parse user data from local storage. Clearing cache...")
      localStorage.clear();
    }
  }
}
