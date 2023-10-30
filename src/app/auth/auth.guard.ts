import {CanActivateFn, Router} from '@angular/router';
import {ApiClientService} from "../api/api-client.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
    const apiClient = inject(ApiClientService);
    const router = inject(Router);
    if (apiClient.loggedIn() === false) {
        router.navigateByUrl("/");
        return false;
    } else {
        return true;
    }
};
