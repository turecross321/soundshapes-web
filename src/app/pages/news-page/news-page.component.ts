import {Component} from '@angular/core';
import {faNewspaper, faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {PageData} from "../../types/page-data";
import {ApiNewsEntry} from "../../api/types/api-news-entry";
import {ApiClientService} from "../../api/api-client.service";
import {ApiListInformation} from "../../api/types/responses/api-list-information";
import {CacheService} from "../../services/cache.service";
import {PageModifiers} from "../../types/page-modifiers";

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: []
})
export class NewsPageComponent {
    itemsCount: number = 32;
    loading: boolean = false;
    newsListInformation: ApiListInformation | null = null;
    modifiers: PageModifiers = this.cache.news?.pageData.modifiers ?? {descending: true};
    showFilters: boolean = false;

    protected readonly faNewspaper = faNewspaper;
    protected readonly faSlidersH = faSlidersH;

    constructor(private apiClient: ApiClientService, private cache: CacheService) {
        if ((this.cache.news?.list.items.length ?? 0) < this.itemsCount)
            this.fetchLaterNews();
    }

    entries(): ApiNewsEntry[] | undefined {
        return this.cache.news?.list.items;
    }

    async changeModifiers(modifiers: PageModifiers) {
        this.cache.news = null;
        this.modifiers = modifiers;
        const pageData: PageData = {
            from: 0,
            count: this.itemsCount,
            modifiers: this.modifiers
        };
        await this.fetchNews(pageData);
    }

    async fetchLaterNews(): Promise<void> {
        if (this.cache!.news != null && this.cache.news.list.listInformation.nextPageIndex == null)
            return;

        const pageData: PageData = {
            from: this.cache.news?.list.listInformation.nextPageIndex ?? 0,
            count: this.itemsCount,
            modifiers: this.modifiers
        };

        return await this.fetchNews(pageData);
    }

    private async fetchNews(pageData: PageData): Promise<void> {
        this.loading = true;
        const response = await this.apiClient.getNews(pageData);
        this.cache.news = this.cache.addToCache(this.cache.news, response, pageData);
        this.loading = false;
    }
}
