import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiLogInRequest} from "./types/requests/api-log-in-request";
import * as sha512 from 'js-sha512';
import {ApiResponse} from "./types/responses/api-response";
import {ApiToken} from "./types/api-token";
import {firstValueFrom} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ApiLoginResponse} from "./types/responses/api-login-response";
import {ApiUser} from "./types/api-user";
import {ApiRefreshTokenRequest} from "./types/requests/api-refresh-token-request";
import {ApiGameAuthenticationSettings} from "./types/api-game-authentication-settings";
import {ApiGameIp} from "./types/api-game-ip";
import {ApiAuthenticateIpRequest} from "./types/requests/api-authenticate-ip-request";
import {unixToDate} from "../date-convert";
import {ApiEula} from "./types/api-eula";
import {ApiRegisterRequest} from "./types/requests/api-register-request";
import {ApiPasswordTokenRequest} from "./types/requests/api-password-token-request";
import {ApiSetPasswordRequest} from "./types/requests/api-set-password-request";

@Injectable({providedIn: 'root'})
export class ApiClientService {
    apiUrl: string = environment.apiBaseUrl + "/api/v1/";
    token: ApiToken | undefined = undefined;
    user: ApiUser | undefined = undefined;

    hasTriedLoggedInAutomatically = false;

    constructor(private httpClient: HttpClient, private toastr: ToastrService) {
        this.logInWithRefreshToken().then(() => {
            this.hasTriedLoggedInAutomatically = true;
        });
    }

    async getGameIps(): Promise<ApiResponse<ApiGameIp[]>> {
        return await this.makeRequest<ApiGameIp[]>("GET", "gameAuth/ip");
    }

    loggedIn(): boolean {
        return this.token != undefined;
    }

    async logOut() {
        await this.makeRequest("post", "account/logOut");
        this.token = undefined;
        this.deleteRefreshToken();
        this.toastr.success("You have been logged out.", "Goodbye!")
    }

    async logIn(email: string, password: string) {
        const body: ApiLogInRequest = {Email: email, PasswordSha512: sha512.sha512(password)};
        const response: ApiResponse<ApiLoginResponse> = await this.makeRequest<ApiLoginResponse>("post", "account/logIn", body);
        this.token = response.Data!.AccessToken;
        this.user = response.Data!.User;
        this.saveRefreshToken(response.Data!.RefreshToken);
        this.toastr.success(`Successfully logged in as ${this.user.Username}`, "Welcome!");
    }

    async getAuthenticationSettings(): Promise<ApiResponse<ApiGameAuthenticationSettings>> {
        return await this.makeRequest<ApiGameAuthenticationSettings>("GET", "gameAuth/settings");
    }

    async uploadAuthenticationSettings(settings: ApiGameAuthenticationSettings): Promise<ApiResponse<null>> {
        return await this.makeRequest<null>("POST", "gameAuth/settings", settings);
    }

    async removeIp(ip: ApiGameIp): Promise<ApiResponse<null>> {
        return await this.makeRequest<null>("DELETE", "gameAuth/ip/address/" + ip.IpAddress);
    }

    async authorizeIp(ip: ApiGameIp, oneTimeUse: boolean): Promise<ApiResponse<null>> {
        const body: ApiAuthenticateIpRequest = {IpAddress: ip.IpAddress, OneTimeUse: oneTimeUse}
        return await this.makeRequest<null>("POST", "gameAuth/ip/authorize", body);
    }

    async getEula(): Promise<ApiResponse<ApiEula>> {
        return await this.makeRequest<ApiEula>("GET", "eula");
    }

    async register(code: string, email: string, password: string): Promise<ApiResponse<null>> {
        const body: ApiRegisterRequest = {
            RegistrationCode: code,
            Email: email,
            PasswordSha512: sha512.sha512(password),
            AcceptEula: true
        };

        return await this.makeRequest<null>("POST", "account/register", body);
    }

    async sendPasswordToken(email: string) {
        const body: ApiPasswordTokenRequest = {Email: email};
        return await this.makeRequest<null>("POST", "account/sendPasswordToken", body);
    }

    async setPassword(code: string, newPassword: string) {
        const body: ApiSetPasswordRequest = {SetPasswordTokenId: code, NewPasswordSha512: sha512.sha512(newPassword)};
        return await this.makeRequest<null>("POST", "account/setPassword", body);
    }

    private async logInWithRefreshToken() {
        const refreshTokenJson = localStorage.getItem("refreshToken");
        if (!refreshTokenJson)
            return;

        const refreshToken: ApiToken = JSON.parse(refreshTokenJson);
        const expiry: Date = unixToDate(refreshToken.ExpiryDate);

        if (new Date() > expiry) {
            this.deleteRefreshToken();
            this.toastr.info("Your refresh token has expired, so you will have to sign in manually in order to log in again.", "Welcome back!");
        }

        const body: ApiRefreshTokenRequest = {RefreshTokenId: refreshToken.Id};
        try {
            const response: ApiResponse<ApiLoginResponse> = await this.makeRequest<ApiLoginResponse>("post", "account/refreshToken", body);
            this.token = response.Data!.AccessToken;
            this.user = response.Data!.User;
            this.saveRefreshToken(response.Data!.RefreshToken);
        } catch (e) {
            if (!(e instanceof HttpErrorResponse)) {
                throw e;
            }
            this.deleteRefreshToken();
            throw e;
        }
    }

    private saveRefreshToken(token: ApiToken) {
        localStorage.setItem("refreshToken", JSON.stringify(token))
    }

    private deleteRefreshToken() {
        localStorage.removeItem("refreshToken");
    }

    private async makeRequest<TData>(method: string, endpoint: string, body: object | null = null): Promise<ApiResponse<TData>> {
        while (endpoint != "account/refreshToken" && !this.hasTriedLoggedInAutomatically) {
            await new Promise(f => setTimeout(f, 1000));
        }

        try {
            return await firstValueFrom(this.httpClient.request<ApiResponse<TData>>(method, this.apiUrl + endpoint, {
                body: body,
                headers: {"Authorization": this.token?.Id ?? ""}
            }));
        } catch (e: any) {
            if (!(e instanceof HttpErrorResponse)) {
                throw e;
            }

            if (e.status == 0) {
                this.toastr.error("Could not reach server. Please try again.", "Error");
            } else if (e.status == 403 && this.loggedIn()) {
                this.toastr.error("Got 403 despite being logged in?", "???");
            } else {
                const res = e.error as ApiResponse<null>;
                this.toastr.error(res.Error?.Message ?? "A description was not provided.", res.Error?.Name ?? "Unknown error");
            }
            throw e;
        }
    }
}
