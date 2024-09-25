import {HttpInterceptorFn} from '@angular/common/http';
import {inject, PLATFORM_ID} from '@angular/core';
import {ApiMeService} from '../services/api-me.service';
import {isPlatformBrowser} from "@angular/common";
import {ApiClientService} from "../services/api-client.service";
import {catchError, Observable, shareReplay, switchMap, throwError} from "rxjs";
import {LoginResponse} from "../types/api/responses/login.response";

const authHeader = "Authorization";
let loginObservable: Observable<any> | null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  // Don't do anything if the endpoint is the login or refreshToken endpoint
  const endpoint = new URL(req.url).pathname;
  if (endpoint === "/api/v1/logIn" || endpoint === "/api/v1/refreshToken") {
    return next(req);
  }

  const meService = inject(ApiMeService);
  const apiClient = inject(ApiClientService);

  let accessToken = meService?.getAccessToken();
  const refreshToken = meService.getRefreshToken();

  // if we don't have a refresh token, but we DO have a refresh token, try to log in with the refresh token
  if (!accessToken && refreshToken) {
    // we're sharing the result of this login in case there are multiple requests at the same time
    loginObservable ??= apiClient.logInWithRefreshToken({refreshTokenId: refreshToken.id}).pipe(
      shareReplay(1)
    );

    return loginObservable.pipe(switchMap((loginResponse: LoginResponse) => {
      if (new Date(loginResponse.accessToken.expiryDate) < new Date()) {
        // the sharedReplay login response appears to have expired already... just remove it and try again
        loginObservable = null;
        return authInterceptor(req, next);
      }

      const authReq = req.clone({
        headers: req.headers.set(authHeader, loginResponse.accessToken.id),
      });

      return next(authReq);
    }));

  } else if (!accessToken) {

    return next(req);
  }


  // we have a good access token now, so we can stop using the shared request one
  loginObservable = null;

  const authReq = req.clone({
    headers: req.headers.set(authHeader, accessToken!.id),
  });

  return next(authReq).pipe(catchError((e) => {
    if (e.status === 403) {
      meService.invalidateAccessToken();
    }
    return throwError(e);
  }));
};

