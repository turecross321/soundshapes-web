import {Routes} from '@angular/router';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {GameAuthPageComponent} from "./pages/game-auth-page/game-auth-page.component";
import {ApiDocumentationPageComponent} from "./pages/api-documentation-page/api-documentation-page.component";
import {VerifyEmailPageComponent} from "./pages/verify-email-page/verify-email-page.component";
import {authGuard} from "./guards/auth.guard";
import {guestGuard} from "./guards/guest.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'gameAuth',
    component: GameAuthPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'verifyEmail',
    component: VerifyEmailPageComponent
  },
  {
    path: 'apiDocs',
    component: ApiDocumentationPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
