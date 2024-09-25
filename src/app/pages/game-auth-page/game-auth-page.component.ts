import {Component} from '@angular/core';
import {GenericPageComponent} from "../../components/generic-page/generic-page.component";
import {BorderComponent} from "../../components/border/border.component";
import {ToggleComponent} from "../../components/toggle/toggle.component";
import {TinyGapContainerComponent} from "../../components/tiny-gap-container/tiny-gap-container.component";
import {AuthorizationSettings} from "../../types/api/authorizationSettings";
import {ApiClientService} from "../../services/api-client.service";
import {faKey, faTowerBroadcast, faWrench} from "@fortawesome/free-solid-svg-icons";
import {fadeIn} from "../../animations";
import {ActivatedRoute} from "@angular/router";
import {IconWithTextComponent} from "../../components/icon-with-text/icon-with-text.component";
import {ButtonComponent} from "../../components/button/button.component";
import {PopupService} from "../../services/popup.service";
import {
  RecommendedAuthSettingsPopupComponent
} from "../../components/recommended-auth-settings-popup/recommended-auth-settings-popup.component";

@Component({
  selector: 'app-game-auth-page',
  standalone: true,
  imports: [
    GenericPageComponent,
    BorderComponent,
    ToggleComponent,
    TinyGapContainerComponent,
    IconWithTextComponent,
    ButtonComponent
  ],
  templateUrl: './game-auth-page.component.html',
  animations: [fadeIn]
})
export class GameAuthPageComponent {

  settings: AuthorizationSettings | null = null;
  showIpWarning: boolean = true;
  protected readonly faKey = faKey;
  protected readonly faWrench = faWrench;
  protected readonly faTowerBroadcast = faTowerBroadcast;

  constructor(private apiClient: ApiClientService, private activatedRoute: ActivatedRoute, private popup: PopupService) {
    activatedRoute.queryParams.subscribe((params) => {
      if (params['platformType']) {
        this.popup.openPopup(RecommendedAuthSettingsPopupComponent);
      }
    })
    this.fetchSettings();
  }

  putSettings() {
    const newSettings = this.settings!;
    this.settings = null;
    this.apiClient.putAuthorizationSettings(newSettings).subscribe((response) => {
      this.settings = response;
    });
  }

  fetchSettings() {
    this.apiClient.getAuthorizationSettings().subscribe((response) => {
      this.settings = response;
    });
  }

  setRpcn(value: boolean) {
    this.settings!.rpcnAuthorization = value;
    this.putSettings();
  }

  setPsn(value: boolean) {
    this.settings!.psnAuthorization = value;
    this.putSettings();
  }

  setIp(value: boolean) {
    this.settings!.ipAuthorization = value;

    if (value) {
      this.showIpWarning = false;
    }

    this.putSettings();
  }
}
