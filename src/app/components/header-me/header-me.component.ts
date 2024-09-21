import {Component, EventEmitter, Output} from '@angular/core';
import {NavLinkComponent} from "../nav-link/nav-link.component";
import {faArrowRightToBracket, faEnvelope, faKey, faSpinner, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {NavButtonComponent} from "../nav-button/nav-button.component";
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";
import {InputComponent} from "../input/input.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ButtonType} from "../../types/components/button.type";
import {InputContentType} from "../../types/components/input-content.type";
import {InputStyle} from "../../types/components/input.type";
import {ApiClientService} from "../../services/api-client.service";
import {catchError, EMPTY} from "rxjs";
import {sha512} from "js-sha512";

@Component({
  selector: 'app-header-me',
  standalone: true,
  imports: [
    NavLinkComponent,
    NavButtonComponent,
    HorizontalDividerComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    FaIconComponent
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
  protected readonly faUserPlus = faUserPlus;
  protected readonly faKey = faKey;
  protected readonly faArrowRightToBracket = faArrowRightToBracket;
  protected readonly InputContentType = InputContentType;
  protected readonly faEnvelope = faEnvelope;
  protected readonly ButtonType = ButtonType;
  protected readonly faSpinner = faSpinner;
  protected readonly InputStyle = InputStyle;

  constructor(private apiClient: ApiClientService) {
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
}
