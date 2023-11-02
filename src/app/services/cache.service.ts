import {Injectable} from '@angular/core';
import {ApiNewsEntry} from "../api/types/api-news-entry";
import {PageData} from "../types/page-data";
import {ApiList} from "../api/types/api-list";
import {CachedApiList} from "../types/cached-api-list";
import {isEqual} from "lodash";

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    news: CachedApiList<ApiNewsEntry> | null = null;

    addToCache<TData>(cacheList: CachedApiList<TData> | null, list: ApiList<TData>, pageData: PageData): CachedApiList<TData> {
        const newItems: TData[] = list.items.filter(e => !cacheList?.list.items.includes(e));

        // if cache list hasn't been set, or if it used a different order / filter or had a different amount of total results,
        // discard the cache
        if (cacheList == null || !isEqual(pageData.modifiers, cacheList.pageData.modifiers)
            || cacheList.list.listInformation.totalItems != list.listInformation.totalItems) {
            cacheList = {list: list, pageData: pageData};
        }
        // if the new data starts earlier and ends later, just switch to the new one
        else if (pageData.from < cacheList.pageData.from && pageData.from + pageData.count > cacheList.pageData.from + cacheList.pageData.count) {
            cacheList.list.items = list.items;
            cacheList.pageData = pageData;
        }
        // if the new data is before the current cache:
        else if (cacheList.pageData.from == pageData.from + pageData.count + 1) {
            // add new data before old
            cacheList.list.items = newItems.concat(cacheList.list.items);
        }
        // if the new data is after the current cache:
        else if (pageData.from == cacheList.list.listInformation.nextPageIndex) {
            // add new items after old, and only keep the last <cacheLimit> items
            cacheList.list.items = cacheList.list.items.concat(newItems);
            cacheList.pageData.from = (pageData.from + pageData.count) - cacheList.list.items.length;
        }
        // if the new data doesn't fit anywhere, discard the cache
        else {
            cacheList = {list: list, pageData: pageData};
        }

        cacheList.list.listInformation = list.listInformation;
        cacheList.pageData.count = cacheList.list.items.length;
        cacheList.pageData.modifiers = pageData.modifiers;

        return cacheList;
    }

    areElementsCached<TData>(cacheList: CachedApiList<TData> | null, pageData: PageData): boolean {
        // if cacheList is null, false
        if (!cacheList)
            return false;
        // if filters don't match, false
        if (!isEqual(pageData.modifiers, cacheList.pageData.modifiers)) {
            return false
        }
        // if cache list starts later than requested, false
        if (cacheList.pageData.from > pageData.from)
            return false;
        // if requested range is bigger than cached range, false
        if (pageData.from + pageData.count > cacheList.pageData.from + cacheList.pageData.count)
            return false;

        return true;
    }
}
