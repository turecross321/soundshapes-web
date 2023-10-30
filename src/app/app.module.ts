import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LevelsPageComponent} from './pages/levels-page/levels-page.component';
import {AlbumsPageComponent} from './pages/albums-page/albums-page.component';
import {UsersPageComponent} from './pages/users-page/users-page.component';
import {LoginPopupComponent} from './components/login-popup/login-popup.component';
import {InputFieldComponent} from './components/input-field/input-field.component';
import {NavbarPopupButtonComponent} from './components/navbar-popup-button/navbar-popup-button.component';
import {DividerComponent} from './components/divider/divider.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MyProfilePopupComponent} from './components/my-profile-popup/my-profile-popup.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {AuthenticationPageComponent} from './pages/authentication-page/authentication-page.component';
import {TwoWayToggleComponent} from './components/two-way-toggle/two-way-toggle.component';
import {ToggleButtonComponent} from './components/toggle-button/toggle-button.component';
import {LoadingComponent} from './components/loading/loading.component';
import {ButtonComponent} from './components/button/button.component';
import {GameIpComponent} from './components/game-ip/game-ip.component';
import {DateComponent} from './components/date/date.component';
import {RegisterPageComponent} from './pages/register-page/register.component';
import {NgOptimizedImage} from "@angular/common";
import {EulaPageComponent} from './pages/eula-page/eula-page.component';
import {TooltipComponent} from './components/tooltip/tooltip.component';
import {PasswordResetPageComponent} from './pages/password-reset-page/password-reset-page.component';
import {DocumentationPageComponent} from './pages/documentation-page/documentation-page.component';
import {PageComponent} from './components/page/page.component';
import {DocumentationRouteComponent} from './components/documentation-route/documentation-route.component';
import {TextWithIconComponent} from './components/text-with-icon/text-with-icon.component';
import {BorderComponent} from './components/border/border.component';
import {CodeBlockComponent} from './components/code-block/code-block.component';
import {ToastComponent} from './components/toast/toast.component';
import {ToastMessageComponent} from './components/toast-message/toast-message.component';
import {ClickedOutsideDirective} from './directives/clicked-outside.directive';
import {NavbarPopupComponent} from './components/navbar-popup/navbar-popup.component';
import {BannedPageComponent} from './pages/banned-page/banned-page.component';
import {SettingsPageComponent} from './pages/settings-page/settings-page.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {ThemeService} from "./services/theme.service";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomePageComponent,
        LevelsPageComponent,
        AlbumsPageComponent,
        UsersPageComponent,
        LoginPopupComponent,
        InputFieldComponent,
        NavbarPopupButtonComponent,
        DividerComponent,
        MyProfilePopupComponent,
        NotFoundPageComponent,
        AuthenticationPageComponent,
        TwoWayToggleComponent,
        ToggleButtonComponent,
        LoadingComponent,
        ButtonComponent,
        GameIpComponent,
        DateComponent,
        RegisterPageComponent,
        EulaPageComponent,
        TooltipComponent,
        PasswordResetPageComponent,
        DocumentationPageComponent,
        PageComponent,
        DocumentationRouteComponent,
        TextWithIconComponent,
        BorderComponent,
        CodeBlockComponent,
        ToastComponent,
        ToastMessageComponent,
        ClickedOutsideDirective,
        NavbarPopupComponent,
        BannedPageComponent,
        SettingsPageComponent,
        DropdownComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgOptimizedImage,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private themeService: ThemeService) {
        if (themeService.isThemingSupported()) {
            const theme: string | null = localStorage.getItem("theme");
            if (theme) {
                themeService.setTheme(theme);
            } else {
                themeService.setTheme("default");
            }
        }
    }
}
