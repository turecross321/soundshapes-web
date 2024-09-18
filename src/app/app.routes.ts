import {Routes} from '@angular/router';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
