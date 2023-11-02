import {Component} from '@angular/core';
import {faAngleRight, faNewspaper} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../api/api-client.service";
import {PageData} from "../../api/types/responses/page-data";
import {ApiNewsEntry} from "../../api/types/api-news-entry";
import {CacheService} from "../../services/cache.service";
import {ApiNewsFilters} from "../../api/types/filters/api-news-filters";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: []
})
export class HomePageComponent {
    loadingNews: boolean = false;
    newsCount: number = 12;
    newsFilters: ApiNewsFilters = {};
    newsPageData: PageData = {from: 0, count: this.newsCount, descending: true};
    protected readonly faNewspaper = faNewspaper;
    protected readonly faAngleRight = faAngleRight;

    constructor(private apiClient: ApiClientService, private cache: CacheService) {
        if (!this.cache.areElementsCached(this.cache.news, this.newsPageData, this.newsFilters))
            this.fetchNews();
    }

    async fetchNews() {
        this.loadingNews = true;
        const response = await this.apiClient.getNews(this.newsPageData);
        this.cache.news = this.cache.addToCache(this.cache.news, response, this.newsPageData, this.newsFilters);
        this.loadingNews = false;
    }

    newsEntries(): ApiNewsEntry[] | undefined {
        return this.cache.news?.list.items.slice(0, 3);
    }
}
