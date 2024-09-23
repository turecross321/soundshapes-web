import {HttpInterceptorFn} from '@angular/common/http';
import {inject, PLATFORM_ID} from '@angular/core';
import {ApiMeService} from '../services/api-me.service';
import {catchError} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }


  // check if the endpoint is the login or refreshToken endpoint
  const endpoint = new URL(req.url).pathname;
  if (endpoint == "/api/v1/logIn" || endpoint == "/api/v1/refreshToken") {
    return next(req);
  }

  const meService = inject(ApiMeService);
  const accessToken = meService?.getAccessToken();

  if (accessToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', accessToken.id)
    })
    return next(authReq).pipe(catchError((e) => {
      if (e.status == 403) {
        meService.invalidateAccessToken();
      }

      throw e;
    }));

  }

  return next(req);
};
