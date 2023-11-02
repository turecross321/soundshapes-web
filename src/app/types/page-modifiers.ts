// im sorry for this horrible name
import {IApiFilters} from "../api/types/filters/i-api-filters";

export interface PageModifiers {
    descending?: boolean;
    filters?: IApiFilters;
    orderBy?: string;
}