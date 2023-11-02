import {IApiFilters} from "./i-api-filters";

export interface ApiNewsFilters extends IApiFilters {
    language?: string | null;
    authors?: string[] | null;
}