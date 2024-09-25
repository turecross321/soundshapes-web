import {Component} from '@angular/core';
import {PopupComponent} from "../popup/popup.component";
import {PopupService} from "../../services/popup.service";

@Component({
  selector: 'app-recommended-auth-settings-popup',
  standalone: true,
  imports: [
    PopupComponent
  ],
  templateUrl: './recommended-auth-settings-popup.component.html',
})
export class RecommendedAuthSettingsPopupComponent {
  constructor(private popupService: PopupService) {

  }

  closePopup() {
    this.popupService.closePopup(RecommendedAuthSettingsPopupComponent);
  }
}
