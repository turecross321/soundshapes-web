import {Injectable, isDevMode} from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private baseUrl: string;
  private apiUrl: string = "/api/v1/";

  constructor(private http: HttpClient, public toaster: ToastService) {
    if (isDevMode()) {
      this.baseUrl = "http://localhost:10061";
    } else {
      this.baseUrl = "https://sound.ture.fish"
    }
  }

  public register(body: RegisterRequest) {
    return this.post("register", body);
  }

  public getEula() {
    return this.get<EulaResponse>("eula");
  }

  public getRegistrationCode(code: string): Observable<CodeResponse> {
    return this.get<CodeResponse>(`register/code/${code}`);
  }

  private post<TResponseData extends IApiResponse>(endpoint: string, body: IApiRequest): Observable<TResponseData> {
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
          let apiError: ApiError = e.error.error as ApiError;
          this.toaster.error(`${apiError.statusCode}: ${this.formatErrorName(apiError.name)}`, apiError.message);


          return throwError(() => e);
        }),
        map(response => response.data)
      );
  }

  private formatErrorName(input: string): string {
    // Remove "Api" at the start and "Error" at the end
    const modifiedString = input.replace(/^Api/, '').replace(/Error$/, '');

    // Add a space before every capital letter except the first one
    return modifiedString.replace(/([A-Z])/g, ' $1').trim();
  }


}
