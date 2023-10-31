import {Component} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faAddressBook, faGlobe, faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {ApiClientService} from "../../api/api-client.service";
import {FormBuilder} from "@angular/forms";
import {ThemeService} from "../../services/theme.service";
import {DropdownOption} from "../../types/dropdown-option";
import {ElementStyle} from "../../types/element-style";
import {validUsername} from "../../regex";
import {FormValidity} from 'src/app/types/form-validity';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: []
})
export class SettingsPageComponent {
    faAddressBook: IconDefinition = faAddressBook;
    faPen: IconDefinition = faPen;
    usernameForm = this.formBuilder.group({
        username: this.apiClient.getUser()?.username,
    });
    username: string = "";
    editingUsername: boolean = false;
    loadingUsernameChange: boolean = false;
    faGlobe: IconDefinition = faGlobe;
    faTrashAlt: IconDefinition = faTrashAlt;
    themes: DropdownOption[] = [
        {
            name: "Default",
            value: "default"
        },
        {
            name: "Dark",
            value: "dark",
        },
        {
            name: "Monochrome",
            value: "monochrome",
        },
        {
            name: "Refresh",
            value: "refresh"
        }
    ]
    protected readonly ElementStyle = ElementStyle;

    constructor(public apiClient: ApiClientService, private formBuilder: FormBuilder, private themeService: ThemeService) {
        apiClient.onUserChange.subscribe((user) => {
            this.usernameForm.setValue({username: user?.username!});
        });
    }

    validUsername(): FormValidity {
        const username = this.usernameForm.value.username!;

        if (!validUsername(username!))
            return {valid: false, message: "Invalid username."}

        return {valid: true, message: ""};
    }

    cancelUsernameChange() {
        this.editingUsername = false;
        this.usernameForm.setValue({username: this.apiClient.getUser()?.username});
    }

    async finishUsernameChange() {
        this.loadingUsernameChange = true;
        const newUsername: string = this.usernameForm.value.username!;
        try {
            await this.apiClient.setUsername(newUsername);
            this.editingUsername = false;
        } catch (e) {
            this.cancelUsernameChange();
        }
        this.loadingUsernameChange = false;
    }

    changeTheme(value: string) {
        this.themeService.setTheme(value);
    }

    currentTheme() {
        return this.themeService.getTheme();
    }

    themingSupported() {
        return this.themeService.isThemingSupported();
    }
}
