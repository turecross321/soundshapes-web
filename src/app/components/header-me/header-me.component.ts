import {Component, EventEmitter, Output} from '@angular/core';
import {NavLinkComponent} from "../nav-link/nav-link.component";
import {faArrowRightToBracket, faEnvelope, faKey, faSpinner, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {NavButtonComponent} from "../nav-button/nav-button.component";
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";
import {InputComponent} from "../input/input.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ButtonType} from "../../types/component-enums/button.type";
import {InputContentType} from "../../types/component-enums/input-content.type";
import {InputStyle} from "../../types/component-enums/input.type";

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

  constructor() {
  }

  emitLinkClick() {
    this.clickLink.emit();
  }

  logIn() {
    this.loggingIn = true;
  }
}
