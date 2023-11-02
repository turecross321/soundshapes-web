import {Component} from '@angular/core';
import {faHashtag, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {ElementStyle} from "../../types/element-style";
import {InputType} from "../../components/input-field/input-field.component";
import {FormBuilder} from "@angular/forms";
import {FormValidity} from "../../types/form-validity";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {ApiClientService} from "../../api/api-client.service";
import {validDeletionCode} from "../../regex";
import {Router} from "@angular/router";

@Component({
    selector: 'app-account-deletion-page',
    templateUrl: './account-deletion-page.component.html',
    styleUrls: []
})
export class AccountDeletionPageComponent {
    faHashtag: IconDefinition = faHashtag;
    faTrashAlt: IconDefinition = faTrashAlt;
    form = this.formBuilder.group({deletionCode: ''});
    clickedOnce: boolean = false;
    deletingAccount: boolean = false;
    protected readonly ElementStyle = ElementStyle;
    protected readonly InputType = InputType;

    constructor(private formBuilder: FormBuilder, private apiClient: ApiClientService, private router: Router) {
    }

    validNewPasswordForm(): FormValidity {
        const code = this.form.get("deletionCode")?.value!;
        if (!validDeletionCode(code))
            return {valid: false, message: "Invalid deletion code."};

        return {valid: true, message: ""};
    }

    getButtonLabel(): string {
        if (!this.clickedOnce) {
            return "Delete account"
        }
        return "Are you sure? This action is irreversible";
    }

    async delete() {
        if (!this.clickedOnce) {
            this.clickedOnce = true;
            return;
        }
        this.deletingAccount = true;
        const code = this.form.get("deletionCode")?.value!;
        try {
            await this.apiClient.deleteAccount(code);
            await this.router.navigateByUrl("/");
        } catch (e) {

        }
        this.deletingAccount = false;
    }
}
