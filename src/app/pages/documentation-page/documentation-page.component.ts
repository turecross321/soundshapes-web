import {Component} from '@angular/core';
import {ApiClientService} from "../../api/api-client.service";
import {ApiRoute} from "../../api/types/api-route";

@Component({
    selector: 'app-documentation-page',
    templateUrl: './documentation-page.component.html',
    styleUrls: []
})
export class DocumentationPageComponent {
    routes: ApiRoute[] = [];
    loading: boolean = true;


    constructor(private apiClient: ApiClientService) {
        this.fetchDocs();
    }

    async fetchDocs() {
        this.loading = true;
        const response: ApiRoute[] = await this.apiClient.getDocumentation();
        this.routes = this.routes.concat(response);
        this.loading = false;
    }
}
