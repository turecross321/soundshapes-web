import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ApiMeService} from "../services/api-me.service";

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const meService = inject(ApiMeService);
  if (meService.loggedIn()) {
    return true
  }

  router.navigateByUrl("");
  return true;
};
