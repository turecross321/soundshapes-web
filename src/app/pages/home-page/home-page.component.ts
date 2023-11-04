import {Component} from '@angular/core';
import {faAngleRight, faClock, faGem, faNewspaper, faPersonRunning} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../api/api-client.service";
import {PageData} from "../../types/page-data";
import {ApiNewsEntry} from "../../api/types/api-news-entry";
import {CacheService} from "../../services/cache.service";
import {CachedApiList} from "../../types/cached-api-list";
import {ApiLevel} from "../../api/types/api-level";
import {loopRange} from "../../helpers/loop-helper";
import {ApiDailyLevel} from "../../api/types/api-daily-level";
import {addToCache, areElementsCached} from "../../helpers/cache-list-helper";

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
    dailyCount: number = 1;
    dailyPageData: PageData = {
        from: 0,
        count: this.dailyCount,
        modifiers: {descending: true}
    }
    daily: CachedApiList<ApiDailyLevel> | null = null;
    loadingNewLevels: boolean = false;
    newLevelsCount: number = 3;
    newLevelsPageData: PageData = {
        from: 0,
        count: this.newLevelsCount
    };
    protected readonly faNewspaper = faNewspaper;
    protected readonly faAngleRight = faAngleRight;
    protected readonly faPersonRunning = faPersonRunning;
    protected readonly loopRange = loopRange;
    protected readonly faClock = faClock;
    protected readonly faGem = faGem;

    constructor(private apiClient: ApiClientService, private cache: CacheService) {
        if (!areElementsCached(this.cache.news, this.newsPageData))
            this.fetchNews();

        if (!areElementsCached(this.cache.levels, this.newLevelsPageData))
            this.fetchNewLevels();

        this.fetchDaily();
    }

    async fetchNews() {
        console.log("KILL.");
        if (this.loadingNews) {
            return;
        }

        this.loadingNews = true;
        const response = await this.apiClient.getNews(this.newsPageData);
        this.cache.news = addToCache(this.cache.news, response, this.newsPageData);
        this.loadingNews = false;
    }

    newsEntries(): ApiNewsEntry[] | undefined {
        return this.cache.news?.list.items.slice(0, this.newsCount);
    }

    async fetchDaily() {
        if (this.loadingDaily) {
            return;
        }

        this.loadingDaily = true;
        const response = await this.apiClient.getDaily(this.dailyPageData);
        this.daily = addToCache(this.daily, response, this.dailyPageData);
        this.loadingDaily = false;
    }

    dailyLevels(): ApiLevel[] | undefined {
        return this.daily?.list.items.slice(0, this.dailyCount).map(d => d.level);
    }

    async fetchNewLevels() {
        if (this.loadingNewLevels)
            return;

        this.loadingNewLevels = true;
        const response = await this.apiClient.getLevels(this.newLevelsPageData);
        this.cache.levels = addToCache(this.cache.levels, response, this.newLevelsPageData);
        this.loadingNewLevels = false;
    }

    newLevels(): ApiLevel[] | undefined {
        return this.cache.levels?.list.items;
    }
}
