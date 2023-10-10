import {Component} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faSpinner, faWrench} from '@fortawesome/free-solid-svg-icons';
import {ApiClientService} from "../../api/api-client.service";
import {ApiResponse} from "../../api/types/responses/api-response";
import {ApiGameAuthenticationSettings} from "../../api/types/api-game-authentication-settings";

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: []
})
export class AuthenticationPageComponent {
  faWrench: IconDefinition = faWrench;
  settings: ApiGameAuthenticationSettings | undefined = undefined;
  loadingSettings: boolean = true;
  faSpinner: IconDefinition = faSpinner;

  constructor(private apiClient: ApiClientService) {
    this.fetchConfiguration();
  }

  async fetchConfiguration() {
    this.loadingSettings = true;
    const response: ApiResponse<ApiGameAuthenticationSettings> = await this.apiClient.getAuthenticationSettings();
    this.loadingSettings = false;
    this.settings = response.Data!;
  }

  changePsn(newValue: boolean) {
    this.settings!.AllowPsnAuthentication = newValue;
    this.changeSettings();
  }

  changeRpcn(newValue: boolean) {
    this.settings!.AllowRpcnAuthentication = newValue;
    this.changeSettings();
  }

  changeIp(newValue: boolean) {
    this.settings!.AllowIpAuthentication = newValue;
    this.changeSettings();
  }

  async changeSettings() {
    await this.apiClient.uploadAuthenticationSettings(this.settings!);
    await this.fetchConfiguration();
  }
}
