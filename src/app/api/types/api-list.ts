import {ApiListInformation} from "./responses/api-list-information";

export interface ApiList<TData> {
    items: TData[],
    listInformation: ApiListInformation
}