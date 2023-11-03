import {Component} from '@angular/core';
import {ApiNewsEntry} from "../../api/types/api-news-entry";
import {ApiClientService} from "../../api/api-client.service";
import {ActivatedRoute} from "@angular/router";
import {faClock, faEllipsisVertical, faFont, faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-news-entry-page',
    templateUrl: './news-entry-page.component.html',
    styleUrls: []
})
export class NewsEntryPageComponent {
    entry: ApiNewsEntry | null = null;
    notFound: boolean = false;
    protected readonly faFont = faFont;
    protected readonly faClock = faClock;
    protected readonly faPlus = faPlus;
    protected readonly faEllipsisVertical = faEllipsisVertical;

    constructor(route: ActivatedRoute, private apiClient: ApiClientService) {
        route.params.subscribe((params) => {
            const id = params["id"];
            if (this.entry?.id != id) {
                this.getEntry(id);
            }
        });

    }

    async getEntry(id: string) {
        this.notFound = false;
        this.entry = null;
        try {
            this.entry = await this.apiClient.getNewsEntry(id);
        } catch (e) {
            this.notFound = true;
        }
    }

    thumbnailUrl() {
        return this.apiClient.getNewsThumbnailUrl(this.entry!);
    }

    wordCount(): number {
        return this.entry!.fullText.split(" ").length;
    }

    wordCountString(): string {
        return `${this.wordCount()} words`;
    }

    readTimeString(): string {
        const count: number = this.wordCount();
        const minutes: number = count / 200;
        return `${Math.ceil(minutes)} minute read`;
    }
}
