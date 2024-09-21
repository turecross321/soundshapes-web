import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ApiMeService} from '../services/api-me.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const meService = inject(ApiMeService);
  const authToken = meService?.accessToken?.id;

  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    })
    return next(authReq);
  }

  return next(req);
};
