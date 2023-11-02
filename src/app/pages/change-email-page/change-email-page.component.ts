import {Component} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {FormBuilder} from "@angular/forms";
import {ApiClientService} from "../../api/api-client.service";
import {FormValidity} from "../../types/form-validity";
import {validEmail, validEmailCode} from "../../helpers/regex-helper";
import {ElementStyle} from 'src/app/types/element-style';
import {faEnvelope, faHashtag, faPen} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";

@Component({
    selector: 'app-change-email-page',
    templateUrl: './change-email-page.component.html',
    styleUrls: []
})
export class ChangeEmailPageComponent {
    faHashtag: IconDefinition = faHashtag;
    faEnvelope: IconDefinition = faEnvelope;
    form = this.formBuilder.group({emailCode: '', newEmail: ''});
    changingEmail: boolean = false;
    faPen: IconDefinition = faPen;
    protected readonly ElementStyle = ElementStyle;

    constructor(private formBuilder: FormBuilder, private apiClient: ApiClientService, private router: Router) {
    }

    validForm(): FormValidity {
        const code = this.form.get("emailCode")?.value!;
        const email = this.form.get("newEmail")?.value!;

        if (!validEmailCode(code))
            return {valid: false, message: "Invalid email code."};

        if (!validEmail(email))
            return {valid: false, message: "Invalid e-mail address."}

        return {valid: true, message: ""};
    }

    async change() {
        const code = this.form.get("emailCode")?.value!;
        const email = this.form.get("newEmail")?.value!;
        this.changingEmail = true;

        try {
            await this.apiClient.setEmail(code, email);
            await this.router.navigateByUrl("/");
        } catch (e) {

        }

        this.changingEmail = false;
    }
}
