import {ApiList} from "../api/types/api-list";
import {PageData} from "../api/types/responses/page-data";
import {IApiFilters} from "../api/types/filters/i-api-filters";

export interface CachedApiList<TData> {
    list: ApiList<TData>;
    pageData: PageData;
    lastFilters: IApiFilters;
}