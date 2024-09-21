import {Component} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {HorizontalDividerComponent} from "../horizontal-divider/horizontal-divider.component";
import {ApiClientService} from "../../services/api-client.service";
import {EulaResponse} from "../../types/api/responses/eula.response";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgIf} from "@angular/common";
import {PopupService} from "../../services/popup.service";
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'app-eula-popup',
  standalone: true,
  imports: [
    ButtonComponent,
    HorizontalDividerComponent,
    FaIconComponent,
    NgIf,
    PopupComponent
  ],
  templateUrl: './eula-popup.component.html',
})
export class EulaPopupComponent {

  eula: EulaResponse | null = null;

  constructor(private apiClient: ApiClientService, private popupService: PopupService) {
    this.apiClient.getEula().subscribe((eula) => {
      this.eula = eula;
    })
  }

  closePopup() {
    this.popupService.closePopup(EulaPopupComponent);
  }
}
