import {Component, EventEmitter, Output} from '@angular/core';
import {LinkComponent} from "../link/link.component";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCloud,
  faCog,
  faEnvelope,
  faKey,
  faUser,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";
import {InputComponent} from "../input/input.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ButtonType} from "../../types/components/button.type";
import {InputContentType} from "../../types/components/input-content.type";
import {InputStyle} from "../../types/components/input.type";
import {ApiClientService} from "../../services/api-client.service";
import {catchError, EMPTY} from "rxjs";
import {sha512} from "js-sha512";
import {ApiMeService} from "../../services/api-me.service";
import {ButtonComponent} from "../button/button.component";
import {ColorType} from "../../types/components/color.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-me',
  standalone: true,
  imports: [
    LinkComponent,
    HorizontalDividerComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    FaIconComponent,
    NgIf,
    ButtonComponent
  ],
  templateUrl: './header-me.component.html',
})
export class HeaderMeComponent {
  @Output() clickLink = new EventEmitter<void>();
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  loggingIn: boolean = false;
  loggingOut: boolean = false;
  protected readonly faUserPlus = faUserPlus;
  protected readonly faKey = faKey;
  protected readonly faArrowRightToBracket = faArrowRightToBracket;
  protected readonly InputContentType = InputContentType;
  protected readonly faEnvelope = faEnvelope;
  protected readonly ButtonType = ButtonType;
  protected readonly InputStyle = InputStyle;
  protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
  protected readonly faUser = faUser;
  protected readonly faCog = faCog;
  protected readonly faCloud = faCloud;
  protected readonly ColorType = ColorType;

  constructor(private apiClient: ApiClientService, public me: ApiMeService, private router: Router) {
  }

  emitLinkClick() {
    this.clickLink.emit();
  }

  logIn() {
    this.loggingIn = true;
    this.apiClient
      .logIn({email: this.loginForm.value.email!, passwordSha512: sha512(this.loginForm.value.password!)})
      .pipe(
        catchError(() => {
          this.loggingIn = false;

          return EMPTY;
        })
      )
      .subscribe((() => {
        this.loggingIn = false;
      }))
  }

  logOut() {
    this.loggingOut = true;
    this.apiClient.logOut().pipe(catchError(() => {
      this.loggingOut = false;
      return EMPTY;
    })).subscribe(() => {
      this.loggingOut = false;
      this.router.navigateByUrl("").then();
    })
  }
}
