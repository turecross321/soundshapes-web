import {Component, Input} from '@angular/core';
import {ApiNewsEntry} from "../../api/types/api-news-entry";
import {ApiClientService} from "../../api/api-client.service";

@Component({
    selector: 'app-news-entry',
    templateUrl: './news-entry.component.html',
    styleUrls: []
})
export class NewsEntryComponent {
    @Input() entry!: ApiNewsEntry;

    constructor(private apiClient: ApiClientService) {
    }

    thumbnailUrl() {
        return this.apiClient.getNewsThumbnailUrl(this.entry.id);
    }

    entryUrl() {
        return `/news/${this.entry.id}`;
    }
}
