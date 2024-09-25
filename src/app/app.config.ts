import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptors/auth.interceptor";
import {StartupService} from "./services/startup.service";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {logErrorsInterceptor} from "./interceptors/log-errors.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, logErrorsInterceptor])),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: (startupService: StartupService) => () => startupService.initializeApp(),
      deps: [StartupService],
      multi: true
    }
  ]
};
