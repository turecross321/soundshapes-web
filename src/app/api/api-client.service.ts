import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {logInRequest} from "./types/requests/log-in-request";
import * as sha512 from 'js-sha512';
import {ApiResponse} from "./types/responses/api-response";
import {ApiSession} from "./types/api-session";
import {firstValueFrom} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: 'root'})
export class ApiClientService {
  apiUrl: string = environment.apiBaseUrl + "/api/v1/";
  session: ApiSession | undefined = undefined;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  loggedIn(): boolean {
    return this.session != undefined;
  }

  async logIn(email: string, password: string) {
    const body: logInRequest = {Email: email, PasswordSha512: sha512.sha512(password)};
    const response: ApiResponse<ApiSession> = await this.makeRequest<ApiSession>("post", "account/logIn", body);
    this.session = response.Data;
  }

  logOut() {
    this.session = undefined;
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
        this.toastr.info("DEBUG: 403 MIGHT WANNA TRY LOGGING IN AGAIN?");
      } else {
        const res = e.error as ApiResponse<null>;
        this.toastr.error(res.Error?.Message ?? "A description was not provided.", res.Error?.Name ?? "Unknown error");
      }
      throw e;
    }
  }
}
