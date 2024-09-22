import {Routes} from '@angular/router';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {GameAuthPageComponent} from "./pages/game-auth-page/game-auth-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'gameAuth',
    component: GameAuthPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
