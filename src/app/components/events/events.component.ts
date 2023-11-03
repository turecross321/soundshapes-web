import {Component} from '@angular/core';
import {PageModifiers} from "../../types/page-modifiers";
import {CachedApiList} from "../../types/cached-api-list";
import {ApiEvent} from "../../api/types/api-event";
import {PageData} from "../../types/page-data";
import {CacheService} from "../../services/cache.service";
import {ApiClientService} from "../../api/api-client.service";
import {faFire} from "@fortawesome/free-solid-svg-icons";
import {range} from "rxjs";
import {loopRange} from "../../helpers/loop-helper";

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: []
})
export class EventsComponent {
    showFilters: boolean = false;
    modifiers: PageModifiers = {descending: true};
    events: CachedApiList<ApiEvent> | null = null;
    loading: boolean = false;
    itemsCount: number = 32;
    protected readonly faFire = faFire;
    protected readonly range = range;
    protected readonly loopRange = loopRange;

    constructor(private apiClient: ApiClientService, private cache: CacheService) {
        this.fetchLaterEvents();
    }

    async fetchLaterEvents(): Promise<void> {
        if (this.events != null && this.events.list.listInformation.nextPageIndex == null)
            return;

        const pageData: PageData = {
            from: this.events?.list.listInformation.nextPageIndex ?? 0,
            count: this.itemsCount,
            modifiers: this.modifiers
        };

        return await this.fetchEvents(pageData);
    }

    async changeModifiers(modifiers: PageModifiers) {
        this.events = null;
        this.modifiers = modifiers;
        const pageData: PageData = {
            from: 0,
            count: this.itemsCount,
            modifiers: this.modifiers
        };
        await this.fetchEvents(pageData);
    }

    async fetchEvents(pageData: PageData) {
        if (this.loading) {
            return;
        }

        this.loading = true;
        const response = await this.apiClient.getEvents(pageData);
        this.events = this.cache.addToCache<ApiEvent>(this.events, response, pageData);
        this.loading = false;
    }
}
