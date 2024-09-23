import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ApiMeService} from "./api-me.service";
import {isPlatformBrowser} from "@angular/common";
import {ApiClientService} from "./api-client.service";
import {UserResponse} from "../types/api/responses/user.response";

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private platformId: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private me: ApiMeService, private apiClient: ApiClientService) {
    this.platformId = platformId; // Assign platformId to a class property
  }

  initializeApp(): Promise<any> {
    return new Promise((resolve) => {

      if (isPlatformBrowser(this.platformId)) {
        const hasRefreshToken = this.me.loadFromStorage();
        if (hasRefreshToken) {
          this.apiClient.getMe().subscribe((user: UserResponse) => {
            this.me.setUser(user);
          })
        }
      }

      resolve(true);
    });
  }
}
