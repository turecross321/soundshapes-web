import {EventEmitter, Injectable, isDevMode, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IApiResponse} from "../types/api/responses/iapi.response";
import {ApiResponse} from "../types/api/responses/api.response";
import {CodeResponse} from "../types/api/responses/code.response";
import {catchError, map, Observable, throwError} from "rxjs";
import {EulaResponse} from "../types/api/responses/eula.response";
import {IApiRequest} from "../types/api/requests/iapi.request";
import {RegisterRequest} from "../types/api/requests/register.request";
import {ApiError} from "../types/api/responses/api.error";
import {ToastService} from "./toast.service";
import {LoginRequest} from "../types/api/requests/login.request";
import {LoginResponse} from "../types/api/responses/login.response";
import {RefreshTokenRequest} from "../types/api/requests/refresh.token.request";
import {WebsiteConfig} from "../../../website.config";
import {AuthorizationSettings} from "../types/api/authorizationSettings";
import {UserResponse} from "../types/api/responses/user.response";

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

  public resendEmail() {
    return this.post<IApiResponse>("verifyEmail/resend", null);
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

          throw e;
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

          throw e;
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
      .pipe(
        catchError((e: any) => {
          try {
            let apiError: ApiError = e.error.error as ApiError;
            let errorName = this.removeApiErrorPrefixAndSuffix(apiError.name);

            this.toaster.error(`${apiError.statusCode}: ${this.addSpaceBetweenCapitalLetters(errorName)}`, apiError.message);
          } catch (newError: any) {
            if (e.status == 0) {
              this.toaster.error("Unable to reach server", "The server is currently unreachable. Please try again later.");
            } else {
              this.toaster.error(`${e.status}: ${e.statusText ? this.addSpaceBetweenCapitalLetters(e.statusText) : "Unknown error"}`, "No explanation was given.");
            }
          }


          return throwError(() => e);
        }),
        map(response => response.data)
      );
  }

  private removeApiErrorPrefixAndSuffix(input: string): string {
    return input.replace(/^Api/, '').replace(/Error$/, '');
  }

  private addSpaceBetweenCapitalLetters(input: string): string {
    return input.replace(/([A-Z])/g, ' $1').trim();
  }


}
