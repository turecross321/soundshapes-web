import {Component} from '@angular/core';
import {faNewspaper, faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {PageData} from "../../api/types/responses/page-data";
import {ApiNewsEntry} from "../../api/types/api-news-entry";
import {ApiClientService} from "../../api/api-client.service";
import {ApiListInformation} from "../../api/types/responses/api-list-information";
import {CacheService} from "../../services/cache.service";
import {ApiNewsFilters} from "../../api/types/filters/api-news-filters";

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: []
})
export class NewsPageComponent {
    itemsCount: number = 32;
    loading: boolean = false;
    newsListInformation: ApiListInformation | null = null;
    filters: ApiNewsFilters = {};
    protected readonly faNewspaper = faNewspaper;
    protected readonly faSlidersH = faSlidersH;

    constructor(private apiClient: ApiClientService, private cache: CacheService) {
        const startingPageData: PageData = {from: 0, count: this.itemsCount, descending: true};
        if (!this.cache.areElementsCached(this.cache.news, startingPageData, this.filters))
            this.fetchNews();
    }

    entries(): ApiNewsEntry[] | undefined {
        return this.cache.news?.list.items;
    }

    async fetchNews() {
        const pageData: PageData = {
            from: this.cache.news?.list.listInformation.nextPageIndex ?? 0,
            count: this.itemsCount,
            descending: true
        };
        this.loading = true;
        const response = await this.apiClient.getNews(pageData);
        this.cache.news = this.cache.addToCache(this.cache.news, response, pageData, this.filters);
        this.loading = false;
    }

    scrolled() {
        this.fetchNews();
    }
}
