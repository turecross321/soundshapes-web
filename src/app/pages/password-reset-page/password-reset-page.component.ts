import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ApiClientService} from "../../api/api-client.service";
import {Router} from "@angular/router";
import {faAngleRight, faEnvelope, faHashtag, faKey} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {validEmail, validPasswordResetCode} from "../../regex";
import {formValidity} from "../../types/form-validity";
import {InputType} from "../../components/input-field/input-field.component";

@Component({
    selector: 'app-password-reset-page',
    templateUrl: './password-reset-page.component.html',
    styleUrls: []
})
export class PasswordResetPageComponent {
    emailForm = this.formBuilder.group({
        email: '',
    });

    newPasswordForm = this.formBuilder.group({passwordCode: '', password: '', passwordConfirm: ''});

    faEnvelope: IconDefinition = faEnvelope;
    faAngleRight: IconDefinition = faAngleRight;
    faHashtag: IconDefinition = faHashtag;
    faKey: IconDefinition = faKey;

    loading: boolean = false;
    currentPage: pageType = pageType.emailInput;
    email: string = "";
    protected readonly pageType = pageType;
    protected readonly InputType = InputType;

    constructor(private formBuilder: FormBuilder, private apiClient: ApiClientService, private router: Router) {

    }

    validEmailForm(): formValidity {
        const email = this.emailForm.get("email")?.value ?? "";
        if (!validEmail(email))
            return {valid: false, message: "Invalid e-mail address"};

        return {valid: true, message: ""};
    }

    validNewPasswordForm(): formValidity {
        const passwordCode = this.newPasswordForm.get("passwordCode")?.value ?? "";
        const password = this.newPasswordForm.get("password")?.value ?? "";
        const passwordConfirm = this.newPasswordForm.get("passwordConfirm")?.value ?? "";

        if (!validPasswordResetCode(passwordCode))
            return {valid: false, message: "Invalid password reset code"};

        if (password.length == 0)
            return {valid: false, message: "Bad password"};

        if (password != passwordConfirm)
            return {valid: false, message: "Passwords don't match"}

        return {valid: true, message: ""};
    }

    async sendEmail() {
        this.loading = true;
        const email = this.emailForm.get("email")?.value ?? "";
        try {
            await this.apiClient.sendPasswordToken(email);
            this.currentPage = pageType.newPasswordInput;
            this.email = email;
        } catch (e) {

        }

        this.loading = false;
    }

    async setPassword() {
        const passwordCode = this.newPasswordForm.get("passwordCode")?.value ?? "";
        const password = this.newPasswordForm.get("password")?.value ?? "";

        this.loading = true;
        try {
            await this.apiClient.setPassword(passwordCode, password);
            await this.apiClient.logIn(this.email, password);
            await this.router.navigateByUrl("/");
        } catch (e) {
        }

        this.loading = false;
    }
}

enum pageType {
    emailInput = 0,
    newPasswordInput = 1
}