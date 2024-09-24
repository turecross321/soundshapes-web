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
      apiClient.onLogout.subscribe((success: boolean) => this.onLogout(success));
      apiClient.onUnsuccessfulRefreshLogin.subscribe(() => {
        this.toast.error("Unexpected login result",
          "The server responded with an unexpected result when attempting to log in with your refresh token. You have been logged out.");
        this.clearData();
      })
    }
  }

  public setUser(value: UserResponse) {
    this.user = value;
    localStorage.setItem("user", JSON.stringify(value));
  }

  public getUser(): UserResponse | null {
    return this.user;
  }

  public loggedIn(): boolean {
    return this.user != null && this.refreshToken != null;
  }

  public getAccessToken(): TokenResponse | null {
    // if its expired, remove it
    if (this.accessToken != null && new Date(this.accessToken.expiryDate) < new Date()) {
      this.invalidateAccessToken();
      return null;
    }

    return this.accessToken;
  }

  public invalidateAccessToken() {
    this.accessToken = null;
    localStorage.removeItem("accessToken");
  }

  public getRefreshToken(): RefreshTokenResponse | null {
    // if it's expired, remove it
    if (!this.refreshToken || new Date(this.refreshToken.expiryDate) < new Date()) {
      this.refreshToken = null;
      return null;
    }

    return this.refreshToken;
  }

  public loadFromStorage(): boolean {
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

      if (this.getRefreshToken()) {
        return true;
      }

    } catch (e) {
      this.toast.warn("Bad cache data", "Unable to parse user data from local storage. Clearing cache...")
      localStorage.clear();
      return false;
    }

    return false;
  }

  private onLogin(response: LoginResponse) {
    this.user = response.user;
    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;

    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("refreshToken", JSON.stringify(response.refreshToken));
    localStorage.setItem("accessToken", JSON.stringify(response.accessToken));

    this.toast.success("Welcome", `Successfully logged in as ${response.user.name}.`);
  }

  private clearData() {
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;

    localStorage.clear();
  }

  private onLogout(success: boolean) {
    this.clearData();

    if (success) {
      this.toast.success("Success", "Successfully logged out.");
    } else {
      this.toast.warn("Failed to revoke token",
        "Failed to revoke your refresh token. Please report this to an administrator.");
    }
  }
}
