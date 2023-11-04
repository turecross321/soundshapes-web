import {Component, Input} from '@angular/core';
import {ApiNewsEntry} from "../../api/types/api-news-entry";
import {ApiClientService} from "../../api/api-client.service";
import {ElementStyle} from "../../types/element-style";

@Component({
    selector: 'app-news-entry',
    templateUrl: './news-entry.component.html',
    styleUrls: []
})
export class NewsEntryComponent {
    @Input() entry: ApiNewsEntry | null = null;
    protected readonly ElementStyle = ElementStyle;

    constructor(private apiClient: ApiClientService) {
    }

    thumbnailUrl() {
        return this.apiClient.getNewsThumbnailUrl(this.entry!);
    }

    entryUrl() {
        return `/news/${this.entry?.id}`;
    }
}
