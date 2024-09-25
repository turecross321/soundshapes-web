import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {PopupComponent} from "../popup/popup.component";
import {PopupService} from "../../services/popup.service";
import {BorderComponent} from "../border/border.component";
import {TinyGapContainerComponent} from "../tiny-gap-container/tiny-gap-container.component";
import {ToggleComponent} from "../toggle/toggle.component";
import {ButtonComponent} from "../button/button.component";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {EXTRA_ARGUMENTS_TOKEN} from "../popup-outlet/popup-outlet.component";
import {PlatformType} from "../../types/api/enums/platform.type";
import {AuthorizationSettings} from "../../types/api/authorizationSettings";

@Component({
  selector: 'app-recommended-auth-settings-popup',
  standalone: true,
  imports: [
    PopupComponent,
    BorderComponent,
    TinyGapContainerComponent,
    ToggleComponent,
    ButtonComponent
  ],
  templateUrl: './recommended-auth-settings-popup.component.html',
})
export class RecommendedAuthSettingsPopupComponent {
  recommendedSettings: AuthorizationSettings = null!;
  @Output() clickYes = new EventEmitter<AuthorizationSettings>();
  protected readonly faCheck = faCheck;
  protected readonly faBan = faBan;
  protected readonly PlatformType = PlatformType;

  constructor(private popupService: PopupService, @Inject(EXTRA_ARGUMENTS_TOKEN) public data: { [key: string]: any }) {
    const platform = data["platform"];
    const genuineNpTicket = data["genuineNpTicket"] == "true";
    if (!platform || genuineNpTicket == null) {
      console.error("Login information was not provided!");
    } else {
      const psn = platform == PlatformType.PS3 || platform == PlatformType.PS4 || platform == PlatformType.PSVita;
      this.recommendedSettings = {
        ipAuthorization: !genuineNpTicket,
        psnAuthorization: genuineNpTicket && psn,
        rpcnAuthorization: genuineNpTicket && platform == PlatformType.RPCS3
      }
    }
  }

  yes() {
    this.clickYes.emit(this.recommendedSettings);
    this.closePopup();
  }

  closePopup() {
    this.popupService.closePopup(RecommendedAuthSettingsPopupComponent);
  }
}
