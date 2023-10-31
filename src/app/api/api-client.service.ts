import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiLogInRequest} from "./types/requests/api-log-in-request";
import {ApiResponse} from "./types/responses/api-response";
import {ApiToken} from "./types/api-token";
import {ApiLoginResponse} from "./types/responses/api-login-response";
import {ApiUser} from "./types/api-user";
import {ApiRefreshTokenRequest} from "./types/requests/api-refresh-token-request";
import {ApiGameAuthenticationSettings} from "./types/api-game-authentication-settings";
import {ApiGameIp} from "./types/api-game-ip";
import {ApiAuthenticateIpRequest} from "./types/requests/api-authenticate-ip-request";
import {ApiEula} from "./types/api-eula";
import {ApiRegisterRequest} from "./types/requests/api-register-request";
import {ApiPasswordTokenRequest} from "./types/requests/api-password-token-request";
import {ApiSetPasswordRequest} from "./types/requests/api-set-password-request";
import {ApiRoute} from "./types/api-route";
import {PageData} from "./types/responses/page-data";
import {hash} from "../sha512";
import {firstValueFrom} from "rxjs/internal/firstValueFrom";
import {ToastService} from "../services/toast.service";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class ApiClientService {
    apiUrl: string = environment.apiBaseUrl + "/api/v1/";
    token: ApiToken | undefined = undefined;
    user: ApiUser | undefined = undefined;

    hasTriedLoggedInAutomatically = false;

    constructor(private httpClient: HttpClient, private toastService: ToastService, private router: Router) {
        this.logInWithRefreshToken().then(() => {
            this.hasTriedLoggedInAutomatically = true;
        });
    }

    async getGameIps(): Promise<ApiResponse<ApiGameIp[]>> {
        return await this.makeRequest<ApiGameIp[]>("GET", "gameAuth/ip");
    }

    loggedIn(): boolean | undefined {
        if (!this.hasTriedLoggedInAutomatically)
            return undefined;

        return this.token != undefined;
    }

    async logOut() {
        await this.makeRequest("post", "account/logOut");
        this.token = undefined;
        this.deleteRefreshToken();
        this.toastService.success("Goodbye!", "You have been logged out.");
        await this.router.navigateByUrl("/");
    }

    async logIn(email: string, password: string) {
        const body: ApiLogInRequest = {email: email, passwordSha512: await hash(password)};
        const response: ApiResponse<ApiLoginResponse> = await this.makeRequest<ApiLoginResponse>("post", "account/logIn", body);
        this.token = response.data!.accessToken;
        this.user = response.data!.user;
        this.saveRefreshToken(response.data!.refreshToken);
        this.toastService.success("Welcome!", `Successfully logged in as ${this.user.username}`,);
    }

    async getAuthenticationSettings(): Promise<ApiResponse<ApiGameAuthenticationSettings>> {
        return await this.makeRequest<ApiGameAuthenticationSettings>("GET", "gameAuth/settings");
    }

    async uploadAuthenticationSettings(settings: ApiGameAuthenticationSettings): Promise<ApiResponse<null>> {
        return await this.makeRequest<null>("POST", "gameAuth/settings", settings);
    }

    async removeIp(ip: ApiGameIp): Promise<ApiResponse<null>> {
        return await this.makeRequest<null>("DELETE", "gameAuth/ip/address/" + ip.ipAddress);
    }

    async authorizeIp(ip: ApiGameIp, oneTimeUse: boolean): Promise<ApiResponse<null>> {
        const body: ApiAuthenticateIpRequest = {ipAddress: ip.ipAddress, oneTimeUse: oneTimeUse}
        return await this.makeRequest<null>("POST", "gameAuth/ip/authorize", body);
    }

    async getEula(): Promise<ApiResponse<ApiEula>> {
        return await this.makeRequest<ApiEula>("GET", "eula");
    }

    async register(code: string, email: string, password: string): Promise<ApiResponse<null>> {
        const body: ApiRegisterRequest = {
            registrationCode: code,
            email: email,
            passwordSha512: await hash(password),
            acceptEula: true
        };

        return await this.makeRequest<null>("POST", "account/register", body);
    }

    async sendPasswordToken(email: string) {
        const body: ApiPasswordTokenRequest = {email: email};
        return await this.makeRequest<null>("POST", "account/sendPasswordToken", body);
    }

    async setPassword(code: string, newPassword: string) {
        const body: ApiSetPasswordRequest = {setPasswordTokenId: code, newPasswordSha512: await hash(newPassword)};
        return await this.makeRequest<null>("POST", "account/setPassword", body);
    }

    async getDocumentation(): Promise<ApiResponse<ApiRoute[]>> {
        return await this.makeRequest<ApiRoute[]>("GET", "documentation");
    }

    private async logInWithRefreshToken() {
        const refreshTokenJson = localStorage.getItem("refreshToken");
        if (!refreshTokenJson)
            return;

        const refreshToken: ApiToken = JSON.parse(refreshTokenJson);

        if (new Date() > new Date(refreshToken.expiryDate)) {
            this.deleteRefreshToken();
            this.toastService.info("Welcome back!", "Your refresh token has expired, so you will have to sign in manually in order to log in again.");
        }

        const body: ApiRefreshTokenRequest = {refreshTokenId: refreshToken.id};
        try {
            const response: ApiResponse<ApiLoginResponse> = await this.makeRequest<ApiLoginResponse>("post", "account/refreshToken", body);
            this.token = response.data!.accessToken;
            this.user = response.data!.user;
            this.saveRefreshToken(response.data!.refreshToken);
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

    private async makeRequest<TData>(method: string, endpoint: string, body: object | null = null, pageData: PageData | null = null): Promise<ApiResponse<TData>> {
        while (endpoint != "account/refreshToken" && !this.hasTriedLoggedInAutomatically) {
            await new Promise(f => setTimeout(f, 1000));
        }

        let params = {}

        if (pageData) {
            params = {
                "from": pageData?.from ?? "",
                "count": pageData?.count ?? "",
                "descending": pageData?.descending ?? ""
            }
        }

        try {
            return await firstValueFrom(this.httpClient.request<ApiResponse<TData>>(method, this.apiUrl + endpoint, {
                body: body,
                headers: {"Authorization": this.token?.id ?? ""},
                params: params

            }));
        } catch (e: any) {
            if (!(e instanceof HttpErrorResponse)) {
                throw e;
            }

            if (e.status == 0) {
                this.toastService.error("Error", "Could not reach server. Please try again.");
            } else if (e.status == 403 && this.loggedIn()) {
                this.toastService.error("???", "Got 403 despite being logged in?");
            } else {
                const res = e.error as ApiResponse<null>;
                this.toastService.error(e.status + " | " + res.error?.name ?? "Error", res.error?.message ?? "A description was not provided.");
            }
            throw e;
        }
    }
}
