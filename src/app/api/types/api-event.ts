import {ApiUser} from "./api-user";
import {ApiNewsEntry} from "./api-news-entry";
import {ApiPlatformType} from "./api-platform-type";
import {ApiEventDataType} from "./api-event-data-type";
import {ApiLevel} from "./api-level";
import {ApiAlbum} from "./api-album";
import {ApiLeaderboardEntry} from "./api-leaderboard-entry";
import {ApiEventType} from "./api-event-type";

export interface ApiEvent {
    id: string;
    eventType: ApiEventType;
    actor: ApiUser;
    creationDate: string;
    platformType: ApiPlatformType;

    dataType: ApiEventDataType | undefined;
    dataLevel: ApiLevel | undefined;
    dataLeaderboardEntry: ApiLeaderboardEntry | undefined;
    dataUser: ApiUser | undefined;
    dataAlbum: ApiAlbum | undefined;
    dataNewsEntry: ApiNewsEntry | undefined;
}