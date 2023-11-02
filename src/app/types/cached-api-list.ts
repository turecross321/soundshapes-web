import {ApiList} from "../api/types/api-list";
import {PageData} from "./page-data";

export interface CachedApiList<TData> {
    list: ApiList<TData>;
    pageData: PageData;
}