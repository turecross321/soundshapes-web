import {Component} from '@angular/core';
import {GenericPageComponent} from "../../components/generic-page/generic-page.component";
import {BorderComponent} from "../../components/border/border.component";
import {ToggleComponent} from "../../components/toggle/toggle.component";
import {TinyGapContainerComponent} from "../../components/tiny-gap-container/tiny-gap-container.component";
import {AuthorizationSettings} from "../../types/api/authorizationSettings";
import {ApiClientService} from "../../services/api-client.service";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {fadeIn} from "../../animations";

@Component({
  selector: 'app-game-auth-page',
  standalone: true,
  imports: [
    GenericPageComponent,
    BorderComponent,
    ToggleComponent,
    TinyGapContainerComponent
  ],
  templateUrl: './game-auth-page.component.html',
  animations: [fadeIn]
})
export class GameAuthPageComponent {

  settings: AuthorizationSettings | null = null;
  protected readonly faKey = faKey;

  constructor(private apiClient: ApiClientService) {
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
    this.putSettings();
  }
}
