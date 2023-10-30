import {Component} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faAddressBook, faAddressCard, faGlobe, faPen} from '@fortawesome/free-solid-svg-icons';
import {ApiClientService} from "../../api/api-client.service";
import {FormBuilder} from "@angular/forms";
import {ThemeService} from "../../services/theme.service";
import {DropdownOption} from "../../types/dropdown-option";

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: []
})
export class SettingsPageComponent {
    faAddressBook: IconDefinition = faAddressBook;
    faPen: IconDefinition = faPen;
    faAddressCard: IconDefinition = faAddressCard;
    usernameForm = this.formBuilder.group({
        username: '',
    });
    emailForm = this.formBuilder.group({
        email: '',
    });
    faGlobe: IconDefinition = faGlobe;
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

    constructor(public apiClient: ApiClientService, private formBuilder: FormBuilder, private themeService: ThemeService) {
    }

    username(): string {
        console.log(this.apiClient.user?.username)
        // TODO: FIX THIS BULLSHIT
        return this.apiClient.user?.username ?? "ASFU89ASD0IOPJ";
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
