import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IApiResponse} from "../types/api/responses/iapi.response";
import {ApiResponse} from "../types/api/responses/api.response";
import {CodeResponse} from "../types/api/responses/code.response";
import {catchError, map, Observable, throwError} from "rxjs";
import {EulaResponse} from "../types/api/responses/eula.response";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private baseUrl: string;
  private apiUrl: string = "/api/v1/";

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.baseUrl = "http://localhost:10061";
    } else {
      this.baseUrl = "https://sound.ture.fish"
    }
  }

  public getEula() {
    return this.get<EulaResponse>("eula");
  }

  public getRegistrationCode(code: string): Observable<CodeResponse> {
    return this.get<CodeResponse>(`register/code/${code}`);
  }

  private get<TResponseData extends IApiResponse>(endpoint: string): Observable<TResponseData> {
    return this.makeRequest<TResponseData>("GET", endpoint, null);
  }

  private makeRequest<TResponseData extends IApiResponse>(method: string, endpoint: string, body: object | null): Observable<TResponseData> {
    return this.http
      .request<ApiResponse<TResponseData>>(method, this.baseUrl + this.apiUrl + endpoint, {body: body})
      .pipe(catchError(this.handleError),
        map(response => response.data));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle the error here (e.g., log it, show a notification, etc.)
    console.error(error.error.error);

    // Rethrow the error
    return throwError(() => error);
  }
}
