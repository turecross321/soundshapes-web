import {Component} from '@angular/core';
import {ApiClientService} from "../../api/api-client.service";
import {ApiEula} from "../../api/types/api-eula";

@Component({
    selector: 'app-eula-page',
    templateUrl: './eula-page.component.html',
    styleUrls: []
})
export class EulaPageComponent {
    eula: ApiEula | undefined = undefined;

    constructor(private apiClient: ApiClientService) {
        this.fetchEula();
    }

    async fetchEula() {
        this.eula = await this.apiClient.getEula();
    }
}
