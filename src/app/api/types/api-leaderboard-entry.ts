import {ApiUser} from "./api-user";
import {ApiPlatformType} from "./api-platform-type";

export interface ApiLeaderboardEntry {
    id: string;
    position: number;
    obsolete: boolean;
    user: ApiUser;
    score: number;
    playTime: number;
    notes: number;
    completed: boolean;
    creationDate: string;
    platformType: ApiPlatformType;
}