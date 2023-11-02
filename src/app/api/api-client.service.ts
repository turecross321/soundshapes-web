import {EventEmitter, Injectable, Output} from "@angular/core";
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
import {PageData} from "../types/page-data";
import {hash} from "../sha512";
import {firstValueFrom} from "rxjs/internal/firstValueFrom";
import {ToastService} from "../services/toast.service";
import {Router} from "@angular/router";
import {ApiSetUsernameRequest} from "./types/requests/api-set-username-request";
import {ApiDeleteAccountRequest} from "./types/requests/api-delete-account-request";
import {ApiSetEmailRequest} from "./types/requests/api-set-email-request";
import {ApiNewsEntry} from "./types/api-news-entry";
import {ApiList} from "./types/api-list";
import {ApiEvent} from "./types/api-event";

@Injectable({providedIn: 'root'})
export class ApiClientService {
    hasTriedLoggedInAutomatically = false;
    @Output() onUserChange = new EventEmitter<ApiUser | null>;
    private apiUrl: string = environment.apiBaseUrl + "/api/v1/";
    private token: ApiToken | undefined | null = undefined;
    private user: ApiUser | null = null;

    constructor(private httpClient: HttpClient, private toastService: ToastService, private router: Router) {
        this.logInWithRefreshToken().then(() => {
            this.hasTriedLoggedInAutomatically = true;
        });
    }

    getUser(): ApiUser | null {
        return this.user;
    }

    setUser(value: ApiUser | null) {
        this.user = value;
        this.onUserChange.emit(value);
    }

    async getGameIps(pageData: PageData): Promise<ApiList<ApiGameIp>> {
        return await this.getList<ApiGameIp>("gameAuth/ip", pageData);
    }

    loggedIn(): boolean | undefined {
        if (!this.hasTriedLoggedInAutomatically)
            return undefined;

        // this might be the dumbest shit I've ever written
        return !(!this.token);
    }

    async logOut() {
        await this.post("account/logOut");
        this.token = undefined;
        this.deleteRefreshToken();
        this.toastService.success("You have been logged out.");
        await this.router.navigateByUrl("/");
    }

    async logIn(email: string, password: string) {
        const body: ApiLogInRequest = {email: email, passwordSha512: await hash(password)};
        const response: ApiLoginResponse = await this.post<ApiLoginResponse>("account/logIn", body);
        this.token = response.accessToken;
        this.setUser(response.user);
        this.saveRefreshToken(response.refreshToken);
        this.toastService.success(`Successfully logged in as ${this.user!.username}`,);
    }

    async getAuthenticationSettings(): Promise<ApiGameAuthenticationSettings> {
        return await this.get<ApiGameAuthenticationSettings>("gameAuth/settings");
    }

    async uploadAuthenticationSettings(settings: ApiGameAuthenticationSettings): Promise<null> {
        return await this.post("gameAuth/settings", settings);
    }

    async removeIp(ip: ApiGameIp): Promise<null> {
        return await this.delete("gameAuth/ip/address/" + ip.ipAddress);
    }

    async authorizeIp(ip: ApiGameIp, oneTimeUse: boolean): Promise<null> {
        const body: ApiAuthenticateIpRequest = {ipAddress: ip.ipAddress, oneTimeUse: oneTimeUse}
        return await this.post("gameAuth/ip/authorize", body);
    }

    async getEula(): Promise<ApiEula> {
        return await this.get<ApiEula>("eula");
    }

    async register(code: string, email: string, password: string): Promise<null> {
        const body: ApiRegisterRequest = {
            registrationCode: code,
            email: email,
            passwordSha512: await hash(password),
            acceptEula: true
        };

        return await this.post("account/register", body);
    }

    async sendPasswordToken(email: string) {
        const body: ApiPasswordTokenRequest = {email: email};
        return await this.post("account/sendPasswordToken", body);
    }

    async sendEmailToken() {
        return await this.post("account/sendEmailToken");
    }

    async sendDeletionToken() {
        return await this.post("account/sendDeletionToken");
    }

    async setUsername(username: string) {
        const body: ApiSetUsernameRequest = {newUsername: username};
        const response = await this.post("account/setUsername", body);
        this.user!.username = username;
        return response;
    }

    async setPassword(code: string, newPassword: string) {
        const body: ApiSetPasswordRequest = {setPasswordTokenId: code, newPasswordSha512: await hash(newPassword)};
        return await this.post("account/setPassword", body);
    }

    async setEmail(code: string, newEmail: string) {
        const body: ApiSetEmailRequest = {setEmailTokenId: code, newEmail: newEmail};
        this.toastService.success("Your e-mail address has been changed.");
        return await this.post("account/setEmail", body);
    }

    async deleteAccount(code: string) {
        const body: ApiDeleteAccountRequest = {accountDeletionTokenId: code};
        const response = await this.delete("account", body);

        this.token = undefined;
        this.setUser(null);
        this.deleteRefreshToken();

        this.toastService.success("Your account has been successfully deleted.");
        return response;
    }

    async getDocumentation(): Promise<ApiRoute[]> {
        return await this.get<ApiRoute[]>("documentation");
    }

    async getNews(pageData: PageData): Promise<ApiList<ApiNewsEntry>> {
        return await this.getList("news", pageData);
    }

    async getNewsEntry(id: string) {
        return await this.get<ApiNewsEntry>(`news/id/${id}`);
    }

    async getEvents(pageData: PageData): Promise<ApiList<ApiEvent>> {
        return await this.getList<ApiEvent>("events", pageData);
    }


    getNewsThumbnailUrl(id: string) {
        return `${this.apiUrl}news/id/${id}/thumbnail`;
    }

    private async logInWithRefreshToken() {
        const refreshTokenJson = localStorage.getItem("refreshToken");
        if (!refreshTokenJson)
            return;

        const refreshToken: ApiToken | null = JSON.parse(refreshTokenJson);
        if (!refreshToken)
            return;

        if (new Date() > new Date(refreshToken.expiryDate)) {
            this.deleteRefreshToken();
            this.toastService.info("Welcome back!", "Your refresh token has expired, so you will have to sign in manually in order to log in again.");
        }

        const body: ApiRefreshTokenRequest = {refreshTokenId: refreshToken.id};
        try {
            const response: ApiLoginResponse = await this.post<ApiLoginResponse>("account/refreshToken", body);
            this.token = response.accessToken;
            this.setUser(response.user);
            this.saveRefreshToken(response.refreshToken);
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

    private async get<TData>(endpoint: string): Promise<TData> {
        const response = await this.makeRequest<TData>("GET", endpoint);
        return response.data!;
    }

    private async getList<TData>(endpoint: string, pageData: PageData): Promise<ApiList<TData>> {
        const response = await this.makeRequest<TData[]>("GET", endpoint, null, pageData);
        return {items: response.data!, listInformation: response.listInformation!};
    }

    private async post<TData>(endpoint: string, body: object | null = null): Promise<TData> {
        const response = await this.makeRequest<TData>("POST", endpoint, body);
        return response.data!;
    }

    private async delete<TData>(endpoint: string, body: object | null = null): Promise<TData> {
        const response = await this.makeRequest<TData>("DELETE", endpoint, body);
        return response.data!;
    }

    private async makeRequest<TData>(method: string, endpoint: string, body: object | null = null, pageData: PageData | null = null): Promise<ApiResponse<TData>> {
        while (endpoint != "account/refreshToken" && !this.hasTriedLoggedInAutomatically) {
            await new Promise(f => setTimeout(f, 1000));
        }

        let params: any = {}

        if (pageData) {
            params.from = pageData.from;
            params.count = pageData.count;

            if (pageData.modifiers?.descending != undefined)
                params.descending = pageData.modifiers.descending;

            if (pageData.modifiers?.orderBy != undefined)
                params.orderBy = pageData.modifiers?.orderBy;

            if (pageData.modifiers?.filters) {
                for (const key in pageData.modifiers.filters) {
                    // @ts-ignore
                    params[key] = pageData.modifiers.filters[key];
                }
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
