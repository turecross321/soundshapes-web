import {Component} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faAddressBook} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: []
})
export class SettingsPageComponent {
    faAddressBook: IconDefinition = faAddressBook;
}
