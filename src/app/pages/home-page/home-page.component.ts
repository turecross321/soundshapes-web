import {Component} from '@angular/core';
import {faAngleRight, faCalendarDay, faNewspaper, faPersonRunning} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../api/api-client.service";
import {PageData} from "../../types/page-data";
import {ApiNewsEntry} from "../../api/types/api-news-entry";
import {CacheService} from "../../services/cache.service";
import {CachedApiList} from "../../types/cached-api-list";
import {ApiLevel} from "../../api/types/api-level";
import {loopRange} from "../../helpers/loop-helper";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: []
})
export class HomePageComponent {
    loadingNews: boolean = false;
    newsCount: number = 1;
    newsPageData: PageData = {from: 0, count: this.newsCount, modifiers: {descending: true}};
    loadingLevels: boolean = false;
    levelsCount: number = 3;
    levelsPageData: PageData = {
        from: 0,
        count: this.levelsCount,
        modifiers: {descending: true, filters: {inLatestDaily: true}}
    }
    dailyLevels: CachedApiList<ApiLevel> | null = null;
    protected readonly faNewspaper = faNewspaper;
    protected readonly faAngleRight = faAngleRight;
    protected readonly faPersonRunning = faPersonRunning;
    protected readonly faCalendarDay = faCalendarDay;
    protected readonly loopRange = loopRange;

    constructor(private apiClient: ApiClientService, private cache: CacheService) {
        if (!this.cache.areElementsCached(this.cache.news, this.newsPageData))
            this.fetchNews();

        this.fetchLevels();
    }

    async fetchNews() {
        if (this.loadingNews) {
            return;
        }

        this.loadingNews = true;
        const response = await this.apiClient.getNews(this.newsPageData);
        this.cache.news = this.cache.addToCache(this.cache.news, response, this.newsPageData);
        this.loadingNews = false;
    }

    newsEntries(): ApiNewsEntry[] | undefined {
        return this.cache.news?.list.items.slice(0, 1);
    }

    async fetchLevels() {
        if (this.loadingLevels) {
            return;
        }

        this.loadingLevels = true;
        const response = await this.apiClient.getLevels(this.levelsPageData);
        this.dailyLevels = this.cache.addToCache(this.dailyLevels, response, this.levelsPageData);
        this.loadingLevels = false;
    }

    levels(): ApiLevel[] | undefined {
        return this.dailyLevels?.list.items.slice(0, 3);
    }
}
