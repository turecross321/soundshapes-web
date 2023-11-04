import {Component, EventEmitter, Output} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {ApiClientService} from "../../api/api-client.service";
import {faArrowRightFromBracket, faGear, faKey, faScroll, faUser} from '@fortawesome/free-solid-svg-icons';
import {Side} from "../../types/side";

@Component({
    selector: 'app-my-profile-popup',
    templateUrl: './my-profile-popup.component.html',
    styleUrls: []
})
export class MyProfilePopupComponent {
    loggingOut: boolean = false;
    faUser: IconDefinition = faUser;
    faKey: IconDefinition = faKey;
    faGear: IconDefinition = faGear;
    faArrowRightFromBracket: IconDefinition = faArrowRightFromBracket;
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
    protected readonly Side = Side;
    protected readonly faScroll = faScroll;

    constructor(private ApiClient: ApiClientService) {
    }

    logOut() {
        this.loggingOut = true;
        this.ApiClient.logOut().then(() => {
            this.loggingOut = false;
            close();
        }).catch(() => {
            this.loggingOut = false;
        });
    }
}
