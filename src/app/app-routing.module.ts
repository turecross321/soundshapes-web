import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LevelsPageComponent} from "./pages/levels-page/levels-page.component";
import {AlbumsPageComponent} from "./pages/albums-page/albums-page.component";
import {UsersPageComponent} from "./pages/users-page/users-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {AuthenticationPageComponent} from "./pages/authentication-page/authentication-page.component";
import {RegisterPageComponent} from "./pages/register-page/register.component";
import {EulaPageComponent} from "./pages/eula-page/eula-page.component";

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'levels', component: LevelsPageComponent},
    {path: 'albums', component: AlbumsPageComponent},
    {path: 'users', component: UsersPageComponent},
    {path: 'authentication', component: AuthenticationPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'eula', component: EulaPageComponent},
    {path: '**', component: NotFoundPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
