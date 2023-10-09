import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LogInRequest} from "./types/requests/log-in-request";
import * as sha512 from 'js-sha512';
import {ApiResponse} from "./types/responses/api-response";
import {ApiToken} from "./types/api-token";
import {firstValueFrom} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ApiLoginResponse} from "./types/responses/api-login-response";
import {ApiUser} from "./types/api-user";
import {RefreshTokenRequest} from "./types/requests/refresh-token-request";

@Injectable({providedIn: 'root'})
export class ApiClientService {
  apiUrl: string = environment.apiBaseUrl + "/api/v1/";
  token: ApiToken | undefined = undefined;
  user: ApiUser | undefined = undefined;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
    this.logInWithRefreshToken()
  }

  loggedIn(): boolean {
    return this.token != undefined;
  }

  async logIn(email: string, password: string) {
    const body: LogInRequest = {Email: email, PasswordSha512: sha512.sha512(password)};
    const response: ApiResponse<ApiLoginResponse> = await this.makeRequest<ApiLoginResponse>("post", "account/logIn", body);
    this.token = response.Data!.AccessToken;
    this.user = response.Data!.User;
    this.saveRefreshToken(response.Data!.RefreshToken);
    this.toastr.success(`Successfully logged in as ${this.user.Username}`, "Welcome!");
  }

  async logOut() {
    await this.makeRequest("post", "account/logOut");
    this.token = undefined;
    this.deleteRefreshToken();
  }

  private async logInWithRefreshToken() {
    const refreshTokenJson = localStorage.getItem("refreshToken");
    if (!refreshTokenJson)
      return;

    const refreshToken: ApiToken = JSON.parse(refreshTokenJson);
    const expiry: Date = new Date(Date.UTC(1970, 0, 1, 0, 0, refreshToken.ExpiryDate * 1000));

    if (new Date() > expiry) {
      this.deleteRefreshToken();
      this.toastr.info("Your refresh token has expired, so you will have to sign in manually in order to log in again.", "Welcome back!");
    }

    const body: RefreshTokenRequest = {RefreshTokenId: refreshToken.Id};
    const response: ApiResponse<ApiLoginResponse> = await this.makeRequest<ApiLoginResponse>("post", "account/refreshToken", body);
    this.token = response.Data!.AccessToken;
    this.user = response.Data!.User;
    this.saveRefreshToken(response.Data!.RefreshToken);
  }

  private saveRefreshToken(token: ApiToken) {
    localStorage.setItem("refreshToken", JSON.stringify(token))
  }

  private deleteRefreshToken() {
    localStorage.removeItem("refreshToken");
  }

  private async makeRequest<TData>(method: string, endpoint: string, body: object | null = null): Promise<ApiResponse<TData>> {
    try {
      return await firstValueFrom(this.httpClient.request<ApiResponse<TData>>(method, this.apiUrl + endpoint, {body: body}));
    } catch (e: any) {
      if (!(e instanceof HttpErrorResponse)) {
        throw e;
      }

      if (e.status == 0) {
        this.toastr.error("Could not reach server. Please try again.", "Error");
      } else if (e.status == 403 && this.loggedIn()) {
        this.toastr.info("Got 403 despite being logged in?");
      } else {
        const res = e.error as ApiResponse<null>;
        this.toastr.error(res.Error?.Message ?? "A description was not provided.", res.Error?.Name ?? "Unknown error");
      }
      throw e;
    }
  }
}
