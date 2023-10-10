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
import {NavbarDropdownButtonComponent} from './components/navbar-dropdown-button/navbar-dropdown-button.component';
import {DividerComponent} from './components/divider/divider.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MyProfilePopupComponent} from './components/my-profile-popup/my-profile-popup.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {AuthenticationPageComponent} from './pages/authentication-page/authentication-page.component';
import {TwoWayToggleComponent} from './components/two-way-toggle/two-way-toggle.component';
import {ToggleButtonComponent} from './components/toggle-button/toggle-button.component';
import {LoadingComponent} from './components/loading/loading.component';

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
    NavbarDropdownButtonComponent,
    DividerComponent,
    MyProfilePopupComponent,
    NotFoundPageComponent,
    AuthenticationPageComponent,
    TwoWayToggleComponent,
    ToggleButtonComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
