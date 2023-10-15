import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faEnvelope, faHashtag, faKey, faQuestionCircle, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {InputType} from "../../components/input-field/input-field.component";
import {ApiClientService} from "../../api/api-client.service";
import {Router} from "@angular/router";

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
    loading: boolean = false;
    protected readonly InputType = InputType;

    constructor(private formBuilder: FormBuilder, private apiClient: ApiClientService, private router: Router) {
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

    async register() {
        this.loading = true;

        const code: string = this.registrationForm.get("code")?.value ?? "";
        const email: string = this.registrationForm.get("email")?.value ?? "";
        const password: string = this.registrationForm.get("password")?.value ?? "";

        try {
            await this.apiClient.register(code, email, password);
            await this.apiClient.logIn(email, password);
            await this.router.navigateByUrl("/");
        } catch (e) {
            this.loading = false;
        }
    }
}

interface formValidity {
    valid: boolean;
    message: string;
}
