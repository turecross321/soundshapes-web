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
import {PasswordResetPageComponent} from "./pages/password-reset-page/password-reset-page.component";
import {DocumentationPageComponent} from "./pages/documentation-page/documentation-page.component";
import {BannedPageComponent} from "./pages/banned-page/banned-page.component";
import {authGuard} from "./auth/auth.guard";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {AccountDeletionPageComponent} from "./pages/account-deletion-page/account-deletion-page.component";
import {ChangeEmailPageComponent} from "./pages/change-email-page/change-email-page.component";
import {NewsEntryPageComponent} from "./pages/news-entry-page/news-entry-page.component";
import {NewsPageComponent} from "./pages/news-page/news-page.component";
import {LevelPageComponent} from "./pages/level-page/level-page.component";

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'levels', component: LevelsPageComponent},
    {path: 'levels/:id', component: LevelPageComponent},
    {path: 'albums', component: AlbumsPageComponent},
    {path: 'users', component: UsersPageComponent},
    {path: 'authentication', component: AuthenticationPageComponent, canActivate: [authGuard]},
    {path: 'register', component: RegisterPageComponent},
    {path: 'eula', component: EulaPageComponent},
    {path: 'resetPassword', component: PasswordResetPageComponent},
    {path: 'documentation', component: DocumentationPageComponent,},
    {path: 'banned', component: BannedPageComponent, canActivate: [authGuard]},
    {path: 'settings', component: SettingsPageComponent, canActivate: [authGuard]},
    {path: 'settings/deleteAccount', component: AccountDeletionPageComponent, canActivate: [authGuard]},
    {path: 'settings/setEmail', component: ChangeEmailPageComponent, canActivate: [authGuard]},
    {path: 'news', component: NewsPageComponent},
    {path: 'news/:id', component: NewsEntryPageComponent},
    {path: '**', component: NotFoundPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
