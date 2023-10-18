import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiClientService} from "../../api/api-client.service";
import {InputType} from "../input-field/input-field.component";
import {faArrowRightToBracket, faEnvelope, faKey, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {Side} from "../../types/side";

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
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
    protected readonly InputType = InputType;
    protected readonly Side = Side;

    constructor(private formBuilder: FormBuilder, private apiClient: ApiClientService) {

    }

    logIn() {
        const email: string = this.loginForm.get("email")?.value ?? "";
        const password: string = this.loginForm.get("password")?.value ?? "";

        this.loggingIn = true;
        this.apiClient.logIn(email, password).then(() => {
            this.loggingIn = false;
            close();
        }).catch(() => {
            this.loggingIn = false;
        });
    }
}
