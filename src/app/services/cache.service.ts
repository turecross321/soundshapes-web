import {Injectable} from '@angular/core';
import {ApiNewsEntry} from "../api/types/api-news-entry";
import {CachedApiList} from "../types/cached-api-list";
import {ApiLevel} from "../api/types/api-level";

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    news: CachedApiList<ApiNewsEntry> | null = null;
    levels: CachedApiList<ApiLevel> | null = null;
}
