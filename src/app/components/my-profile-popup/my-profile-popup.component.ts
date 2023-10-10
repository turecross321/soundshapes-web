import {Component, EventEmitter, Output} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faArrowRightFromBracket, faGear, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../api/api-client.service";

@Component({
  selector: 'app-my-profile-popup',
  templateUrl: './my-profile-popup.component.html',
  styleUrls: []
})
export class MyProfilePopupComponent {
    @Output() onClose: EventEmitter<void> = new EventEmitter();
    loggingOut: boolean = false;

    close(): void {
        this.onClose.emit();
    }

  faUser: IconDefinition = faUser;
  faKey: IconDefinition = faKey;
  faGear: IconDefinition = faGear;
  faArrowRightFromBracket: IconDefinition = faArrowRightFromBracket;

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
