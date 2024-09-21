import {HttpInterceptorFn} from '@angular/common/http';
import {map} from "rxjs";

function updateDateProperties(obj: any): void {
  function recurse(currentObj: any) {
    for (const key in currentObj) {
      if (currentObj.hasOwnProperty(key)) {
        const value = currentObj[key];

        if (value instanceof Date) {
          currentObj[key] = new Date(value);
        } else if (typeof value === 'object' && value !== null) {
          recurse(value);
        }
      }
    }
  }

  recurse(obj);
}

export const dateFixInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((response) => {
      updateDateProperties(response);
      return response;
    })
  );
};
