import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {ApiError} from "../types/api/responses/api.error";
import {inject} from "@angular/core";
import {ToastService} from "../services/toast.service";

function removeApiErrorPrefixAndSuffix(input: string): string {
  return input.replace(/^Api/, '').replace(/Error$/, '');
}

function addSpaceBetweenCapitalLetters(input: string): string {
  return input.replace(/([A-Z])/g, ' $1').trim();
}


export const logErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((e: any) => {
      try {
        let apiError: ApiError = e.error.error as ApiError;
        let errorName = removeApiErrorPrefixAndSuffix(apiError.name);

        toast.error(`${apiError.statusCode}: ${addSpaceBetweenCapitalLetters(errorName)}`, apiError.message);
      } catch (newError: any) {
        if (e.status == 0 || e.status == 502) {
          toast.error("Unable to reach server", "The server is currently unreachable. Please try again later.");
        } else {
          toast.error(`${e.status}: ${e.statusText ? addSpaceBetweenCapitalLetters(e.statusText) : "Unknown error"}`, "No explanation was given.");
        }
      }


      return throwError(() => e);
    }));
};
