import {Component} from '@angular/core';
import {faArrowRightToBracket, faEnvelope, faKey, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FormBuilder} from "@angular/forms";
import {ApiClientService} from "../../api/api-client.service";
import {InputType} from "../input-field/input-field.component";

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: []
})
export class LoginPopupComponent {
  faEnvelope: IconDefinition = faEnvelope;
  faKey: IconDefinition = faKey;
  faArrowRightToBracket: IconDefinition = faArrowRightToBracket;
  faUserPlus: IconDefinition = faUserPlus;

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  loggingIn = false;
  protected readonly InputType = InputType;

  constructor(private formBuilder: FormBuilder, private apiClient: ApiClientService) {

  }

  logIn() {
    const email: string = this.loginForm.get("email")?.value ?? "";
    const password: string = this.loginForm.get("password")?.value ?? "";

    this.loggingIn = true;
    this.apiClient.logIn(email, password).then(() => {
      this.loggingIn = false;
    }).catch(() => {
      this.loggingIn = false;
    });
  }
}
