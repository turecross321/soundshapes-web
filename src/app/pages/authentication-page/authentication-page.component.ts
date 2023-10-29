import {Component} from '@angular/core';
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {ApiClientService} from "../../api/api-client.service";
import {ApiResponse} from "../../api/types/responses/api-response";
import {ApiGameAuthenticationSettings} from "../../api/types/api-game-authentication-settings";
import {ApiGameIp} from "../../api/types/api-game-ip";
import {faBroadcastTower, faRedo, faWrench} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-authentication-page',
    templateUrl: './authentication-page.component.html',
    styleUrls: []
})
export class AuthenticationPageComponent {
    faWrench: IconDefinition = faWrench;
    faBroadcastTower: IconDefinition = faBroadcastTower;
    faRedo: IconDefinition = faRedo;

    settings: ApiGameAuthenticationSettings | undefined = undefined;
    loadedConfiguration: boolean = false;

    ips: ApiGameIp[] = [];
    loadingIps: boolean = false;
    showIps: boolean = false;

    constructor(private apiClient: ApiClientService) {
        this.fetchConfiguration();
    }

    authorizedIps(): ApiGameIp[] {
        return this.ips.filter(i => i.authorized);
    }

    pendingIps(): ApiGameIp[] {
        return this.ips.filter(i => !i.authorized);
    }

    showIpAuthentication() {
        this.showIps = true;
        this.fetchIps();
    }

    async fetchConfiguration() {
        this.loadedConfiguration = false;
        const response: ApiResponse<ApiGameAuthenticationSettings> = await this.apiClient.getAuthenticationSettings();
        this.loadedConfiguration = true;
        this.settings = response.data!;
    }

    changePsn(newValue: boolean) {
        this.settings!.allowPsnAuthentication = newValue;
        this.uploadSettings();
    }

    changeRpcn(newValue: boolean) {
        this.settings!.allowRpcnAuthentication = newValue;
        this.uploadSettings();
    }

    changeIp(newValue: boolean) {
        this.settings!.allowIpAuthentication = newValue;
        this.uploadSettings();

        if (newValue) {
            this.fetchIps();
        }
    }

    uploadSettings() {
        this.apiClient.uploadAuthenticationSettings(this.settings!).then(() => {
        });
    }

    async fetchIps() {
        this.loadingIps = true;
        const response = await this.apiClient.getGameIps();
        this.ips = response.data!;
        this.loadingIps = false;
    }

    async removeIp(ip: ApiGameIp) {
        // remove from local list
        this.ips = this.ips.filter(i => i != ip);
        await this.apiClient.removeIp(ip);
    }

    async authorizeIp(ip: ApiGameIp, oneTimeUse: boolean) {
        ip.oneTimeUse = oneTimeUse;
        ip.authorized = true;
        ip.modificationDate = new Date();
        await this.apiClient.authorizeIp(ip, oneTimeUse);
    }
}
