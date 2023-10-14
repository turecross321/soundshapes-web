import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faEnvelope, faHashtag, faKey, faQuestionCircle, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {InputType} from "../../components/input-field/input-field.component";

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: []
})
export class RegisterPageComponent {
    registrationForm = this.formBuilder.group({
        code: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    faHashtag: IconDefinition = faHashtag;
    faEnvelope: IconDefinition = faEnvelope;
    faKey: IconDefinition = faKey;
    faUserPlus: IconDefinition = faUserPlus;
    faQuestionCircle: IconDefinition = faQuestionCircle;
    emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    protected readonly InputType = InputType;

    constructor(private formBuilder: FormBuilder) {
    }

    validForm(): formValidity {
        const code: string = this.registrationForm.get("code")?.value ?? "";
        const email: string = this.registrationForm.get("email")?.value ?? "";
        const password: string = this.registrationForm.get("password")?.value ?? "";
        const passwordConfirm: string = this.registrationForm.get("passwordConfirm")?.value ?? "";

        if (code.length != 8)
            return {valid: false, message: "Invalid registration code"}

        if (password != passwordConfirm)
            return {valid: false, message: "Passwords don't match"}

        if (!this.emailRegex.test(email))
            return {valid: false, message: "Invalid e-mail address"}

        return {valid: true, message: ""};
    }

    register() {
        console.log("REGISTER");
    }
}

interface formValidity {
    valid: boolean;
    message: string;
}
