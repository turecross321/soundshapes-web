import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ApiMeService} from '../services/api-me.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
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
    return next(authReq);
  }

  return next(req);
};
