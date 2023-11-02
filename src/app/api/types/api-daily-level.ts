import {ApiLevel} from "./api-level";
import {ApiUser} from "./api-user";

export interface ApiDailyLevel {
    id: string;
    level: ApiLevel;
    date: string;
    creationDate: string;
    modificationDate: string;
    author: ApiUser;
}