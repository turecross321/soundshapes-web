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

  public user: UserResponse | null = null;
  public accessToken: TokenResponse | null = null;
  public refreshToken: RefreshTokenResponse | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private toast: ToastService, private apiClient: ApiClientService) {
    if (isPlatformBrowser(platformId)) {
      apiClient.onLogin.subscribe((response) => this.onLogin(response));
    }
  }

  public onLogin(response: LoginResponse) {
    this.user = response.user;
    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;

    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("refreshToken", JSON.stringify(response.refreshToken));

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
    } catch (e) {
      this.toast.warn("Bad cache data", "Unable to parse user data from local storage. Clearing cache...")
      localStorage.clear();
    }
  }
}
