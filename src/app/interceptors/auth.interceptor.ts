import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ApiMeService} from '../services/api-me.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
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
