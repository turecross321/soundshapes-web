import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ApiMeService} from "./api-me.service";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private platformId: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private me: ApiMeService) {
    this.platformId = platformId; // Assign platformId to a class property
  }

  initializeApp(): Promise<any> {
    return new Promise((resolve) => {

      if (isPlatformBrowser(this.platformId)) {
        this.me.loadFromStorage();
      }

      resolve(true);
    });
  }
}
