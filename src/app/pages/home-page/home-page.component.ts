import {Component} from '@angular/core';
import {faAngleRight, faCalendarDay, faNewspaper, faPersonRunning} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../api/api-client.service";
import {PageData} from "../../types/page-data";
import {ApiNewsEntry} from "../../api/types/api-news-entry";
import {CacheService} from "../../services/cache.service";
import {CachedApiList} from "../../types/cached-api-list";
import {ApiLevel} from "../../api/types/api-level";
import {loopRange} from "../../helpers/loop-helper";
import {ApiDailyLevel} from "../../api/types/api-daily-level";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: []
})
export class HomePageComponent {
    loadingNews: boolean = false;
    newsCount: number = 1;
    newsPageData: PageData = {from: 0, count: this.newsCount, modifiers: {descending: true}};
    loadingDaily: boolean = false;
    dailyCount: number = 3;
    dailyPageData: PageData = {
        from: 0,
        count: this.dailyCount,
        modifiers: {descending: true}
    }
    daily: CachedApiList<ApiDailyLevel> | null = null;
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
        if (this.loadingDaily) {
            return;
        }

        this.loadingDaily = true;
        const response = await this.apiClient.getDaily(this.dailyPageData);
        this.daily = this.cache.addToCache(this.daily, response, this.dailyPageData);
        this.loadingDaily = false;
    }

    levels(): ApiLevel[] | undefined {
        return this.daily?.list.items.slice(0, 3).map(d => d.level);
    }
}
