import {EventEmitter, Injectable, isDevMode, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IApiResponse} from "../types/api/responses/iapi.response";
import {ApiResponse} from "../types/api/responses/api.response";
import {CodeResponse} from "../types/api/responses/code.response";
import {EulaResponse} from "../types/api/responses/eula.response";
import {IApiRequest} from "../types/api/requests/iapi.request";
import {RegisterRequest} from "../types/api/requests/register.request";
import {ToastService} from "./toast.service";
import {LoginRequest} from "../types/api/requests/login.request";
import {LoginResponse} from "../types/api/responses/login.response";
import {RefreshTokenRequest} from "../types/api/requests/refresh.token.request";
import {WebsiteConfig} from "../../../website.config";
import {AuthorizationSettings} from "../types/api/authorizationSettings";
import {UserResponse} from "../types/api/responses/user.response";
import {CodeRequest} from "../types/api/requests/code-request";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  @Output() onLogin = new EventEmitter<LoginResponse>();
  @Output() onUnsuccessfulRefreshLogin = new EventEmitter<void>();
  // boolean represents if it was a success or not
  @Output() onLogout = new EventEmitter<boolean>();

  private baseUrl: string;
  private apiUrl: string = "/api/v1/";

  constructor(private http: HttpClient, public toaster: ToastService) {
    if (isDevMode()) {
      this.baseUrl = WebsiteConfig.devApiUrl;
    } else {
      this.baseUrl = WebsiteConfig.remoteApiUrl;
    }
  }

  public verifyEmail(body: CodeRequest) {
    return this.post<UserResponse>("verifyEmail", body);
  }

  public resendEmail() {
    return this.post<IApiResponse>("verifyEmail/resend", null);
  }

  public getIps() {
    //return this.getList()
  }

  public putAuthorizationSettings(body: AuthorizationSettings) {
    return this.put<AuthorizationSettings>("gameAuth", body);
  }

  public getAuthorizationSettings() {
    return this.get<AuthorizationSettings>("gameAuth");
  }

  public logOut() {
    return this.post<IApiRequest>("revokeToken", {})
      .pipe(
        map(response => {
            this.onLogout.emit(true);
            return response;
          }
        ),
        catchError((e) => {
          this.onLogout.emit(false);

          return throwError(() => e);
        })
      );
  }

  public logInWithRefreshToken(body: RefreshTokenRequest) {
    return this.post<LoginResponse>("refreshToken", body)
      .pipe(
        map(response => {
          this.onLogin.emit(response);
          return response;
        }),
        catchError((e) => {
          this.onUnsuccessfulRefreshLogin.emit();

          return throwError(() => e);
        })
      );
  }

  public logIn(body: LoginRequest) {
    return this.post<LoginResponse>("logIn", body).pipe(
      map(response => {
        this.onLogin.emit(response);
        return response;
      })
    );
  }

  public register(body: RegisterRequest) {
    return this.post("register", body);
  }

  public getEula() {
    return this.get<EulaResponse>("eula");
  }

  public getMe(): Observable<UserResponse> {
    return this.get<UserResponse>("users/me");
  }

  public getRegistrationCode(code: string): Observable<CodeResponse> {
    return this.get<CodeResponse>(`register/code/${code}`);
  }

  private put<TResponseData extends IApiResponse>(endpoint: string, body: IApiRequest | null): Observable<TResponseData> {
    return this.makeRequest<TResponseData>("PUT", endpoint, body);
  }

  private post<TResponseData extends IApiResponse>(endpoint: string, body: IApiRequest | null): Observable<TResponseData> {
    return this.makeRequest<TResponseData>("POST", endpoint, body);
  }


  private get<TResponseData extends IApiResponse>(endpoint: string): Observable<TResponseData> {
    return this.makeRequest<TResponseData>("GET", endpoint, null);
  }

  private makeRequest<TResponseData extends IApiResponse>(method: string, endpoint: string, body: object | null): Observable<TResponseData> {
    return this.http
      .request<ApiResponse<TResponseData>>(method, this.baseUrl + this.apiUrl + endpoint, {body: body})
      .pipe(map(response => response.data));
  }
}
